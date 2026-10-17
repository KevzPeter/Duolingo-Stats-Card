export const DUO_ANIMATIONS = [
  { id: 'backflip', label: 'Backflip', file: 'duo_backflip.gif' },
  { id: 'flight', label: 'Flying', file: 'duo_flight.gif' },
  { id: 'hop', label: 'Hopping', file: 'duo_hop.gif' },
  { id: 'waving', label: 'Waving', file: 'duo_waving.gif' },
  { id: 'whistling', label: 'Whistling', file: 'duo_whistling.gif' },
] as const;

export type DuoAnimation = typeof DUO_ANIMATIONS[number]['id'];

export function selectDuoAnimation(animation?: string) {
  return DUO_ANIMATIONS.find(item => item.id === animation) || DUO_ANIMATIONS.find(item => item.id === 'hop')!;
}
