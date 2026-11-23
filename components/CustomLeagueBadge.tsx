import React from 'react';

// Custom artwork for leagues whose official web assets are not yet available.
const badges: Record<string, { background: string; border: string; gem: string; highlight: string }> = {
  Amber: { background: '#A45B12', border: '#F4B43D', gem: '#FFCA53', highlight: '#FFE8A1' },
  Aqua: { background: '#087D91', border: '#48D6E2', gem: '#7CF0ED', highlight: '#D2FFFA' },
  Jade: { background: '#177550', border: '#55C995', gem: '#82E5B1', highlight: '#D1FFDF' },
  Indigo: { background: '#373B91', border: '#858AEF', gem: '#AAB1FF', highlight: '#E0E2FF' },
  Platinum: { background: '#607985', border: '#C0D5DC', gem: '#E0EEF0', highlight: '#FFFFFF' },
};

export function CustomLeagueBadge({ league }: Readonly<{ league: string }>): JSX.Element | null {
  const colors = badges[league];
  if (!colors) return null;
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 53 64" aria-hidden="true">
    <path d="M8 3h37l5 6v34L38 59H15L3 43V9z" fill={colors.background} stroke={colors.border} strokeWidth={5} strokeLinejoin="round" />
    <path d="M14 26l6-9h13l6 9-12.5 17z" fill={colors.gem} stroke={colors.border} strokeWidth={2} strokeLinejoin="round" />
    <path d="M14 26h25M20 17l6.5 9L33 17M26.5 26v17" fill="none" stroke={colors.highlight} strokeWidth={2} strokeLinejoin="round" />
  </svg>;
}

export function hasCustomLeagueBadge(league: string): boolean {
  return Object.hasOwn(badges, league);
}
