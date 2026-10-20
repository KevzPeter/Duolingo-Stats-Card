import type { AccountCourse, DashboardData, Profile } from './account-models';
import type { AnimationPlacement } from './animation-layout';
import type { DuoAnimation } from './animations';
import type { CardDimensions } from './card-dimensions';

export interface DisplayOptions extends CardDimensions {
  animation?: DuoAnimation;
  animationPlacement?: Partial<AnimationPlacement>;
  hideAnimation?: boolean;
  showAvatar: boolean;
  showJoined: boolean;
  showScores?: boolean;
}

export interface CardRow { label: string; value: string }

// Only values used by the card, never the raw upstream profile.
export interface Metadata extends Profile {
  tokenExpired?: boolean;
  courses: AccountCourse[];
  avatarBase64?: string | null;
  duoAnimationBase64?: string | null;
  weeklyXp?: DashboardData['weeklyXp'];
  languageScores?: DashboardData['languageScores'];
  hearts?: DashboardData['hearts'];
  gems?: DashboardData['gems'];
}
