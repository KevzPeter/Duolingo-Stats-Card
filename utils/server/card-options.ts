import type { NextApiRequest } from 'next';
import { PUBLISH_FIELDS, PublishField } from '../account-models';
import { THEME_NAMES } from '../config';
import { DUO_ANIMATIONS, DuoAnimation } from '../animations';
import { AppError } from './errors';
import { queryString } from './http';

export function cardOptions(query: NextApiRequest['query']) {
  const requested = queryString(query.theme)?.trim().toLowerCase();
  const theme = THEME_NAMES.includes(requested) ? requested : null;
  const requestedAnimation = queryString(query.animation);
  const animation = requestedAnimation === undefined || requestedAnimation === 'auto' ? undefined : requestedAnimation;
  if (animation !== undefined && !DUO_ANIMATIONS.some(item => item.id === animation)) throw new AppError(400, 'animation', 'Choose a supported animation.');
  const selection = queryString(query.fields);
  const fields = selection === undefined ? [] : Array.from(new Set(selection === '' ? [] : selection.split(',').map(field => field.trim())));
  if (fields.some(field => !PUBLISH_FIELDS.includes(field as PublishField))) throw new AppError(400, 'fields', 'Choose supported card fields.');
  const animationPlacement: Partial<import('../animation-layout').AnimationPlacement> = {};
  for (const [key, min, max] of [['x', 0, 420], ['y', 0, 425], ['size', 32, 420]] as const) {
    const value = queryString(query[key]);
    if (value === undefined) continue;
    if (!/^(?:\d+)(?:\.\d{1,2})?$/.test(value) || Number(value) < min || Number(value) > max) throw new AppError(400, 'placement', `Choose a valid ${key} between ${min} and ${max}.`);
    animationPlacement[key] = Number(value);
  }
  return { theme, animation: animation as DuoAnimation | undefined, animationPlacement, fields: fields as PublishField[], showAvatar: queryString(query.showAvatar) !== 'false', showJoined: queryString(query.showJoined) !== 'false', showScores: queryString(query.showScores) === 'true', showWeeklyXp: queryString(query.showWeeklyXp) !== 'false' };
}
