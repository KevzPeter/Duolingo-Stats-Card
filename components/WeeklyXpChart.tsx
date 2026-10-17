import { ActivityDay } from '../utils/account-models';
import { numberFormatter } from '../utils/numberFormatter';

export default function WeeklyXpChart({ days }: Readonly<{ days: ActivityDay[] | null }>) {
  const color = 'var(--surface-text)';
  const accent = 'var(--chart-accent)';
  const maximum = Math.max(4, ...(days || []).map(day => day.xp));
  const magnitude = 10 ** Math.floor(Math.log10(maximum));
  const tickSize = Math.ceil(maximum / 4 / magnitude * 10) / 10 * magnitude;
  const scale = tickSize * 4;
  const points = (days || []).map((day, index) => ({
    x: 44 + index * 53, y: 130 - day.xp / scale * 84,
  }));
  const path = points.map((point, index) => `${index ? 'L' : 'M'}${point.x},${point.y}`).join(' ');
  return <svg xmlns="http://www.w3.org/2000/svg" className="weeklyXpChart" width="100%" height="166" viewBox="0 0 388 166" role="img" aria-label="Daily XP for the previous seven completed days">
    <title>XP earned over the previous seven completed days</title>
    <rect x="0.5" y="0.5" width="387" height="165" rx="12" fill="var(--surface-background)" />
    <text x="14" y="24" fill={color} fontSize="12" fontWeight="600">Weekly XP</text>
    {days ? <>
      {[0, 1, 2, 3, 4].map(index => {
        const y = 130 - index * 21;
        return <g key={index}>
          <line x1="44" x2="362" y1={y} y2={y} stroke={color} strokeOpacity="0.14" />
          <text x="34" y={y + 3} fill={color} fillOpacity="0.65" textAnchor="end" fontSize="9">{numberFormatter(tickSize * index)}</text>
        </g>;
      })}
      <path d={path} fill="none" stroke={accent} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      {days.map((day, index) => {
        const { x, y } = points[index];
        const date = new Date(day.date + 'T00:00:00Z');
        const label = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'][date.getUTCDay()];
        return <g key={day.date}>
          <title>{`${day.date}: ${day.xp.toLocaleString('en-US')} XP`}</title>
          <circle cx={x} cy={y} r="3.5" fill={accent} />
          <text x={x} y="150" fill={color} fillOpacity="0.7" textAnchor="middle" fontSize="10">{label}</text>
        </g>;
      })}
    </> : <text x="194" y="94" fill={color} fillOpacity="0.75" textAnchor="middle" fontSize="12">XP history unavailable</text>}
  </svg>;
}
