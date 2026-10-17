export interface AnimationPlacement { x: number; y: number; size: number }

export const CARD_WIDTH = 420;
export const CARD_SCALE = 1;
export const CARD_DISPLAY_WIDTH = CARD_WIDTH * CARD_SCALE;
export const MIN_ANIMATION_SIZE = 32;
export const SUMMARY_HEIGHT = 180;

export function cardHeight(weeklyXp: boolean, scores: boolean, tokenExpired = false): number {
  return SUMMARY_HEIGHT + (weeklyXp ? 198 : 22) + (scores ? 69 : 0) + (tokenExpired ? 36 : 0);
}

// Positions refer to the top-left of the animation in SVG pixels. The card clips
// overflow; changing optional sections must not move or resize the animation.
export function animationLayout(placement: Partial<AnimationPlacement> | undefined): AnimationPlacement {
  const size = Math.floor(Math.max(MIN_ANIMATION_SIZE, Math.min(placement?.size ?? 72.3, CARD_WIDTH)) * 10) / 10;
  return {
    x: Math.round((placement?.x ?? 336.6) * 10) / 10,
    y: Math.round((placement?.y ?? 24.2) * 10) / 10,
    size,
  };
}
