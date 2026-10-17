export const PUBLISH_FIELDS = ['hearts', 'gems'] as const;
export type PublishField = typeof PUBLISH_FIELDS[number];
export type ConnectionState = 'connected' | 'reconnect' | 'unavailable';
export interface Profile {
  id: string;
  username: string;
  name: string;
  picture: string;
  streak: number | null;
  totalXp: number | null;
  creationDate: number | null;
  league: string | null;
  topThreeFinishes: number | null;
}
export interface AccountCourse {
  id: string;
  title: string;
  subject: string;
  xp: number | null;
  learningLanguage: string;
}
export interface ActivityDay { date: string; xp: number }
export interface LanguageScore { id: string; language: string; title: string; score: number }
export interface DashboardData {
  profile: Profile;
  timeZone: string;
  updatedAt: string;
  state: ConnectionState;
  notice?: 'partial';
  weeklyXp: ActivityDay[] | null;
  languageScores: LanguageScore[] | null;
  courses: AccountCourse[] | null;
  hearts: { current: number | null } | null;
  gems: number | null;
}
export const FIELD_LABELS: Record<PublishField, string> = { hearts: 'Hearts', gems: 'Gems' };
