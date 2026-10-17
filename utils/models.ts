import type { AccountCourse, DashboardData, Profile } from './account-models';
import type { AnimationPlacement } from './animation-layout';

export interface DisplayOptions {
  animationPlacement?: Partial<AnimationPlacement>;
  hideAnimation?: boolean;
  showAvatar: boolean;
  showJoined: boolean;
  showScores?: boolean;
}

export interface CardRow { label: string; value: string }

// Only values used by the card, never the raw upstream profile.
export interface Metadata extends Profile {
  courses: AccountCourse[];
  avatarBase64?: string | null;
  duoGifBase64?: string | null;
  weeklyXp?: DashboardData['weeklyXp'];
  languageScores?: DashboardData['languageScores'];
  hearts?: DashboardData['hearts'];
  gems?: DashboardData['gems'];
}
