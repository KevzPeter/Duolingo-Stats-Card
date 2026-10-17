import axios from 'axios';
import { AccountCourse, DashboardData, LanguageScore, Profile } from '../account-models';
import { UpstreamError } from './errors';
import { readTokenClaims } from './security';
import { weeklyXpFrom } from './weekly-xp';
import { fetchLeagueStats, LEAGUE_NAMES } from './league-stats';

type Json = Record<string, any>;
const ROOT = 'https://www.duolingo.com';
const PROFILE_FIELDS = 'id,username,name,picture,totalXp,streak,creationDate,learningLanguage,courses';
export const numberOrNull = (value: unknown): number | null => typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null;
const text = (value: unknown, fallback = '') => typeof value === 'string' ? value.slice(0, 200) : fallback;

async function request(path: string, token?: string, params?: Record<string, string | number>): Promise<Json> {
  // No caller-provided origin and no redirects: bearer credentials cannot leave Duolingo.
  try {
    const response = await axios.get(ROOT + path, {
      headers: { 'User-Agent': 'duolingo-stats-card', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      params, timeout: 8000, maxRedirects: 0, maxContentLength: 4 * 1024 * 1024,
    });
    if (!response.data || typeof response.data !== 'object' || Array.isArray(response.data)) throw new UpstreamError('network');
    return response.data;
  } catch (error) {
    if (error instanceof UpstreamError) throw error;
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) throw new UpstreamError('auth');
      if (error.response?.status === 403 || error.response?.status === 429) throw new UpstreamError('blocked');
    }
    // Never return/log Axios errors: they contain the Authorization header.
    throw new UpstreamError('network');
  }
}

export function profileFrom(data: Json): Profile {
  return { id: String(data.id), username: text(data.username), name: text(data.name, text(data.username)),
    // Generated avatar URLs encode appearance in the path and can exceed 200
    // characters. Reject oversized URLs rather than truncating valid paths.
    picture: typeof data.picture === 'string' && data.picture.length <= 4096 ? data.picture : '',
    streak: numberOrNull(data.streak), totalXp: numberOrNull(data.totalXp), creationDate: numberOrNull(data.creationDate),
    league: typeof data.league === 'string' && LEAGUE_NAMES.includes(data.league) ? data.league : null,
    topThreeFinishes: Number.isSafeInteger(data.topThreeFinishes) && data.topThreeFinishes >= 0 ? data.topThreeFinishes : null };
}

export async function verifyToken(token: string): Promise<{ profile: Profile; expiresAt: Date }> {
  const claims = readTokenClaims(token);
  const data = await request(`/2023-05-23/users/${claims.id}`, token, { fields: 'id,username,health,gems' });
  if (String(data.id) !== claims.id || typeof data.username !== 'string' || !data.username) throw new UpstreamError('auth');
  return { profile: profileFrom(data), expiresAt: claims.expiresAt };
}

export async function fetchPublicProfile(id: string): Promise<Json> {
  const data = await request(`/2017-06-30/users/${id}`);
  if (String(data.id) !== id || !data.username) throw new UpstreamError('network');
  return { ...data, ...await fetchLeagueStats(id) };
}

export function normalizeDashboard(profile: Json, progress: Json | null, balances: Json | null, timeZone: string, now = Date.now()): DashboardData {
  const courses: AccountCourse[] | null = Array.isArray(profile.courses) ? profile.courses.filter(course => course?.id != null).map(course => ({
    id: String(course.id), subject: text(course.subject, 'language'), title: text(course.title, text(course.subject, text(course.learningLanguage, 'Course'))),
    learningLanguage: text(course.learningLanguage), xp: numberOrNull(course.xp),
  })).sort((a, b) => (b.xp ?? -1) - (a.xp ?? -1)).slice(0, 3) : null;
  const health = balances?.health;
  return {
    profile: profileFrom(profile), timeZone, updatedAt: new Date(now).toISOString(), state: 'connected',
    weeklyXp: weeklyXpFrom(progress?.xpGains, timeZone, now), languageScores: null, courses,
    hearts: health && typeof health === 'object' ? { current: numberOrNull(health.hearts) } : null,
    gems: numberOrNull(balances?.gems),
  };
}

export async function fetchDashboard(id: string, username: string, token: string, timeZone: string): Promise<DashboardData> {
  const profile = await request(`/2023-05-23/users/${id}`, token, { fields: PROFILE_FIELDS });
  if (String(profile.id) !== id || typeof profile.username !== 'string' || profile.username.toLowerCase() !== username.toLowerCase()) throw new UpstreamError('auth');
  const results = await Promise.allSettled([
    request(`/2023-05-23/users/${id}`, token, { fields: 'xpGains' }),
    request(`/2023-05-23/users/${id}`, token, { fields: 'health,gems' }),
    fetchLanguageScores(id, profile.courses, token),
    fetchLeagueStats(id),
  ]);
  // A rejected credential invalidates the entire authenticated snapshot.
  if (results.some(result => result.status === 'rejected' && result.reason instanceof UpstreamError && result.reason.kind === 'auth')) throw new UpstreamError('auth');
  const [progress, balances, scores, league] = results;
  const dashboard = normalizeDashboard(profile, progress.status === 'fulfilled' ? progress.value : null, balances.status === 'fulfilled' ? balances.value : null, timeZone);
  dashboard.languageScores = scores.status === 'fulfilled' ? scores.value.scores : null;
  if (league.status === 'fulfilled') Object.assign(dashboard.profile, league.value);
  if (results.some(result => result.status === 'rejected') || (scores.status === 'fulfilled' && scores.value.partial)) dashboard.notice = 'partial';
  return dashboard;
}

async function fetchLanguageScores(id: string, courses: unknown, token: string) {
  if (!Array.isArray(courses)) return { scores: null, partial: false };
  const seen = new Set<string>();
  const languages = courses.filter(course => {
    if (!course || typeof course.id !== 'string' || !course.id || course.id.length > 200 ||
        typeof course.learningLanguage !== 'string' || !course.learningLanguage || seen.has(course.id)) return false;
    seen.add(course.id);
    return true;
  }).slice(0, 12);
  const scores: LanguageScore[] = [];
  let index = 0;
  let partial = false;
  let rejected = false;
  // At most 12 courses, with only three bounded requests in flight.
  async function fetchNextCourse(): Promise<void> {
    if (index < languages.length && !rejected) {
      const course = languages[index++];
      try {
        // This endpoint ignores field filtering, so allowlist its response explicitly.
        const detail = await request(`/2023-05-23/users/${id}/courses/${encodeURIComponent(course.id)}`, token);
        if (detail.id !== course.id || detail.learningLanguage !== course.learningLanguage) throw new UpstreamError('network');
        const score = numberOrNull(detail.scoreMetadata?.reachedScore);
        if (score !== null && Number.isInteger(score) && score <= 160) scores.push({
          id: course.id, language: text(course.learningLanguage), title: text(course.title, text(course.learningLanguage)), score,
        });
      } catch (error) {
        if (error instanceof UpstreamError && error.kind === 'auth') { rejected = true; throw error; }
        partial = true;
      }
      await fetchNextCourse();
    }
  }
  await Promise.all(Array.from({ length: Math.min(3, languages.length) }, () => fetchNextCourse()));
  scores.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  return { scores, partial };
}

export function emptyDashboard(profile: Profile, timeZone: string, state: 'reconnect' | 'unavailable'): DashboardData {
  return { profile, timeZone, state, updatedAt: new Date().toISOString(), weeklyXp: null, languageScores: null, courses: null, hearts: null, gems: null };
}

// Public requests always use a separate request without Authorization.
export async function fetchPublicUsername(username: string): Promise<Json> {
  const data = await request('/2017-06-30/users', undefined, { username });
  const profile = data.users?.[0];
  if (!profile || typeof profile.username !== 'string' || profile.username.toLowerCase() !== username.toLowerCase() || !/^[1-9]\d*$/.test(String(profile.id))) throw new UpstreamError('network');
  return { ...profile, ...await fetchLeagueStats(String(profile.id)) };
}
