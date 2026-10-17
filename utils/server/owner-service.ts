import { createHash } from 'node:crypto';
import { DashboardData } from '../account-models';
import { emptyDashboard, fetchDashboard, fetchPublicUsername, normalizeDashboard, profileFrom, verifyToken } from './duolingo';
import { AppError, UpstreamError } from './errors';
import { readTokenClaims, validTimeZone } from './security';

function configuration() {
  const token = process.env.DUOLINGO_JWT?.trim();
  const username = process.env.DUOLINGO_USERNAME?.trim();
  if (!token || !username || !/^[\w.-]{1,100}$/.test(username)) throw new AppError(503, 'configuration', 'Configure DUOLINGO_JWT and DUOLINGO_USERNAME on the server, then redeploy.');
  let timeZone: string;
  try { timeZone = validTimeZone(process.env.DUOLINGO_TIMEZONE || 'UTC'); }
  catch { throw new AppError(503, 'configuration', 'Configure a valid DUOLINGO_TIMEZONE on the server, then redeploy.'); }
  return { token, username, timeZone };
}

// One bounded process-local entry; no cross-instance persistence or rate-limit guarantee.
let cache: { key: string; data: DashboardData; until: number } | undefined;
let pending: { key: string; promise: Promise<DashboardData> } | undefined;
const valid = (token: string) => { try { readTokenClaims(token); return true; } catch { return false; } };

async function fallback(username: string, timeZone: string, state: 'reconnect' | 'unavailable') {
  const profile = await fetchPublicUsername(username);
  const data = emptyDashboard(profileFrom(profile), timeZone, state);
  data.courses = normalizeDashboard(profile, null, null, timeZone).courses;
  return data;
}

export async function ownerDashboard(): Promise<DashboardData> {
  const { token, username, timeZone } = configuration();
  const key = createHash('sha256').update(JSON.stringify([token, username, timeZone])).digest('hex');
  if (cache?.key !== key) cache = undefined;
  // Always check expiry before reading even a fresh authenticated snapshot.
  if (!valid(token) && cache?.data.state === 'connected') cache = undefined;
  if (cache && cache.until > Date.now()) return cache.data;
  if (pending?.key === key) return pending.promise;
  const promise = (async () => {
    let data: DashboardData;
    try {
      if (!valid(token)) throw new UpstreamError('auth');
      const verified = await verifyToken(token);
      if (verified.profile.username.toLowerCase() !== username.toLowerCase()) throw new UpstreamError('auth');
      data = await fetchDashboard(verified.profile.id, username, token, timeZone);
      if (!valid(token)) throw new UpstreamError('auth');
    } catch (error) {
      cache = undefined;
      data = await fallback(username, timeZone, (error instanceof UpstreamError && error.kind === 'auth') || !valid(token) ? 'reconnect' : 'unavailable');
    }
    cache = { key, data, until: Date.now() + 60000 };
    return data;
  })();
  pending = { key, promise };
  try { return await promise; }
  finally { if (pending?.promise === promise) pending = undefined; }
}
