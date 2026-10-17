import { AccountCourse, DashboardData, Profile } from '../account-models';
import { CardRow, Metadata } from '../models';

// Copy only display values; upstream-provided image data and attributes are never trusted.
export function cardMetadata(profile: Profile, courses: AccountCourse[] = []): Metadata {
  return { ...profile, courses: courses.slice(0, 3) };
}

export function ownerCard(data: DashboardData): { metadata: Metadata; rows: CardRow[] } {
  const metadata = cardMetadata(data.profile, data.courses || []);
  const connected = data.state === 'connected';
  metadata.weeklyXp = connected ? data.weeklyXp : null;
  metadata.languageScores = connected ? data.languageScores : null;
  if (connected) {
    metadata.hearts = data.hearts;
    metadata.gems = data.gems;
  }
  const rows: CardRow[] = connected ? [] : [{
    label: 'Owner stats', value: data.state === 'reconnect' ? 'Replace JWT and redeploy' : 'Temporarily unavailable',
  }];
  if (data.notice === 'partial') rows.push({ label: 'Availability', value: 'Some stats unavailable' });
  return { metadata, rows };
}
