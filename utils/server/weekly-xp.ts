import { ActivityDay } from '../account-models';

const dayInZone = (time: number, formatter: Intl.DateTimeFormat) => {
  const parts = formatter.formatToParts(time);
  const get = (type: string) => parts.find(part => part.type === type)?.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
};

// Seven completed local calendar days; today's partial progress is excluded.
export function weeklyXpFrom(gains: unknown, timeZone: string, now = Date.now()): ActivityDay[] | null {
  if (!Array.isArray(gains)) return null;
  const formatter = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' });
  const today = Date.parse(dayInZone(now, formatter) + 'T00:00:00Z');
  const days = Array.from({ length: 7 }, (_, index) => ({
    date: new Date(today - (7 - index) * 86400000).toISOString().slice(0, 10), xp: 0,
  }));
  for (const gain of gains) {
    if (!gain || typeof gain.time !== 'number' || !Number.isFinite(gain.time) || gain.time < 0 ||
        typeof gain.xp !== 'number' || !Number.isFinite(gain.xp) || gain.xp < 0) continue;
    const time = gain.time * 1000;
    if (!Number.isFinite(time) || time > now || time < today - 9 * 86400000) continue;
    const date = dayInZone(time, formatter);
    const day = days.find(day => day.date === date);
    if (day && Number.isFinite(day.xp + gain.xp)) day.xp += gain.xp;
  }
  return days;
}
