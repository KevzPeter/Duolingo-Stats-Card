import axios from 'axios';

export const LEAGUE_NAMES = ['Bronze', 'Silver', 'Gold', 'Sapphire', 'Ruby', 'Emerald', 'Amethyst', 'Pearl', 'Obsidian', 'Diamond'];
export interface LeagueStats { league: string | null; topThreeFinishes: number | null }
const empty = (): LeagueStats => ({ league: null, topThreeFinishes: null });
const cache = new Map<string, { until: number; promise: Promise<LeagueStats> }>();

export function leagueStatsFrom(value: unknown): LeagueStats {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return empty();
  const data = value as Record<string, unknown>;
  return {
    league: Number.isInteger(data.tier) && Number(data.tier) >= 0 ? LEAGUE_NAMES[Number(data.tier)] ?? null : null,
    topThreeFinishes: typeof data.top_three_finishes === 'number' && Number.isSafeInteger(data.top_three_finishes) && data.top_three_finishes >= 0 ? data.top_three_finishes : null,
  };
}

export async function fetchLeagueStats(id: string): Promise<LeagueStats> {
  if (!/^[1-9]\d{0,15}$/.test(id) || !Number.isSafeInteger(Number(id))) return empty();
  const existing = cache.get(id);
  if (existing && existing.until > Date.now()) return existing.promise;
  if (cache.size >= 32) cache.delete(cache.keys().next().value);
  const promise = (async () => {
    try {
      // This summary is public. Never send the owner's JWT to this service.
      const response = await axios.get(`https://duolingo-leaderboards-prod.duolingo.com/leaderboards/7d9f5dd1-8423-491a-91f2-2532052038ce/users/${id}`, {
        headers: { 'User-Agent': 'duolingo-stats-card' }, timeout: 8000, maxRedirects: 0, maxContentLength: 256 * 1024,
      });
      return leagueStatsFrom(response.data);
    } catch {
      // Optional public stats must not prevent rendering the rest of the card.
      if (cache.get(id)?.promise === promise) cache.delete(id);
      return empty();
    }
  })();
  cache.set(id, { until: Date.now() + 60000, promise });
  return promise;
}
