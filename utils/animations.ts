export const DUO_ANIMATIONS = [
  { id: 'backflip', label: 'Backflip', file: 'duo_backflip.webp', width: 194, height: 210 },
  { id: 'flight', label: 'Flying', file: 'duo_flight.webp', width: 124, height: 137 },
  { id: 'hop', label: 'Hopping', file: 'duo_hop.webp', width: 334, height: 295 },
  { id: 'peace', label: 'Peace', file: 'duo_peace.webp', width: 228, height: 308 },
  { id: 'potion', label: 'Potion', file: 'duo_potion.webp', width: 360, height: 274 },
  { id: 'waving', label: 'Waving', file: 'duo_waving.webp', width: 300, height: 267 },
  { id: 'whistling', label: 'Whistling', file: 'duo_whistling.webp', width: 387, height: 427 },
] as const;

export type DuoAnimation = typeof DUO_ANIMATIONS[number]['id'];

export function selectDuoAnimation(animation?: string) {
  return DUO_ANIMATIONS.find(item => item.id === animation) || DUO_ANIMATIONS.find(item => item.id === 'waving')!;
}
