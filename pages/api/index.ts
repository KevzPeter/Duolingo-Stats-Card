import type { NextApiRequest, NextApiResponse } from 'next';
import { generateSvg } from '../../utils/generateSVG';
import { normalizeDashboard } from '../../utils/server/duolingo';
import { cardMetadata } from '../../utils/server/card-metadata';
import { getDuoGifDataUri, fetchImageAsBase64 } from '../../utils/server/card-assets';
import { fetchPublicProfile, fetchPublicUsername } from '../../utils/server/duolingo';
import { apiError, queryString } from '../../utils/server/http';
import { AppError } from '../../utils/server/errors';
import { cardOptions } from '../../utils/server/card-options';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); throw new AppError(405, 'method', 'Method not allowed.'); }
    const username = queryString(req.query.username)?.trim();
    const id = queryString(req.query.id)?.trim();
    if (!username && !id) throw new AppError(400, 'input', 'Missing username / id parameter in query.');
    if (username ? !/^[\w.-]{1,100}$/.test(username) : !/^[1-9]\d{0,15}$/.test(id) || !Number.isSafeInteger(Number(id))) throw new AppError(400, 'input', 'Choose a valid username or numeric ID.');
    const options = cardOptions(req.query);
    const profile = username ? await fetchPublicUsername(username) : await fetchPublicProfile(id);
    const normalized = normalizeDashboard(profile, null, null, 'UTC');
    const metadata = cardMetadata(normalized.profile, normalized.courses || []);
    metadata.duoGifBase64 = await getDuoGifDataUri(options.animation);
    if (options.showAvatar && typeof metadata.picture === 'string') metadata.avatarBase64 = await fetchImageAsBase64(metadata.picture);
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=60');
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.send(generateSvg(metadata, options.theme, options));
  } catch (error) { return apiError(res, error); }
}
