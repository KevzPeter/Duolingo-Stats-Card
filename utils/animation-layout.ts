export interface AnimationPlacement { x: number; y: number; size: number }

export const CARD_WIDTH = 420;
export const ANIMATION_RATIO = 152 / 122;
export const MIN_ANIMATION_SIZE = 32;

export function cardHeight(weeklyXp: boolean, scores: boolean): number {
  return (weeklyXp ? 361 : 185) + (scores ? 64 : 0);
}

// Positions refer to the top-left of the animation in SVG pixels. Keep it inside
// the card when optional sections change the available height.
export function animationLayout(placement: Partial<AnimationPlacement> | undefined, height: number, balances: boolean): AnimationPlacement {
  const size = Math.floor(Math.max(MIN_ANIMATION_SIZE, Math.min(placement?.size ?? (balances ? 122 : 132), CARD_WIDTH, height / ANIMATION_RATIO)) * 10) / 10;
  return {
    x: Math.round(Math.max(0, Math.min(placement?.x ?? 274, CARD_WIDTH - size)) * 10) / 10,
    y: Math.round(Math.max(0, Math.min(placement?.y ?? (balances ? 40 : 10), height - size * ANIMATION_RATIO)) * 10) / 10,
    size,
  };
}
