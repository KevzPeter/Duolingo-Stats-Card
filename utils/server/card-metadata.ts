import { AccountCourse, DashboardData, Profile } from '../account-models';
import { CardRow, Metadata } from '../models';

// Copy only display values; upstream-provided image data and attributes are never trusted.
export function cardMetadata(profile: Profile, courses: AccountCourse[] = []): Metadata {
  return { ...profile, courses: courses.slice(0, 3) };
}

export function ownerCard(data: DashboardData): { metadata: Metadata; rows: CardRow[] } {
  const metadata = cardMetadata(data.profile, data.courses || []);
  const connected = data.state === 'connected';
  if (connected) {
    metadata.weeklyXp = data.weeklyXp;
    metadata.languageScores = data.languageScores;
    metadata.hearts = data.hearts;
    metadata.gems = data.gems;
  }
  if (data.state === 'reconnect') metadata.tokenExpired = true;
  const rows: CardRow[] = data.state === 'unavailable' ? [{ label: 'Owner stats', value: 'Temporarily unavailable' }] : [];
  return { metadata, rows };
}
