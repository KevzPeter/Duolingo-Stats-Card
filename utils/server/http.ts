import type { NextApiRequest, NextApiResponse } from 'next';
import { AppError } from './errors';

export function noStore(res: NextApiResponse) {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
}

export function apiError(res: NextApiResponse, error: unknown) {
  // Do not serialize upstream responses, request configuration, or credentials.
  const known = error instanceof AppError;
  if (known && error.status === 429) res.setHeader('Retry-After', '60');
  return res.status(known ? error.status : 503).json({ error: known ? error.message : 'Stats are temporarily unavailable.', code: known ? error.code : 'unavailable' });
}

export function queryString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) throw new AppError(400, 'query', 'Repeated query parameters are not allowed.');
  return value;
}

export function ownerRequest(req: NextApiRequest, res: NextApiResponse) {
  noStore(res);
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    throw new AppError(405, 'method', 'Method not allowed.');
  }
  if (Object.keys(req.query).some(key => !['theme', 'animation', 'x', 'y', 'size', 'showAvatar', 'showJoined', 'showScores', 'showWeeklyXp', 'fields'].includes(key))) {
    throw new AppError(400, 'query', 'Owner endpoints do not accept account selectors.');
  }
}
