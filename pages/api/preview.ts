import type { NextApiRequest, NextApiResponse } from 'next';
import type { CardPreview } from '../../utils/card-preview';
import { ownerDashboard } from '../../utils/server/owner-service';
import { fetchPublicUsername, normalizeDashboard } from '../../utils/server/duolingo';
import { cardMetadata, ownerCard } from '../../utils/server/card-metadata';
import { fetchImageAsBase64 } from '../../utils/server/card-assets';
import { apiError, noStore, queryString } from '../../utils/server/http';
import { AppError } from '../../utils/server/errors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  noStore(res);
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      throw new AppError(405, 'method', 'Method not allowed.');
    }
    if (Object.keys(req.query).some(key => key !== 'username')) throw new AppError(400, 'query', 'Unsupported query parameter.');
    // An explicit username ALWAYS takes the public path, without owner credentials.
    const publicLookup = req.query.username !== undefined;
    const username = queryString(req.query.username)?.trim();
    if (publicLookup && !/^[\w.-]{1,100}$/.test(username || '')) throw new AppError(400, 'input', 'Choose a valid username.');
    let data = publicLookup
      ? normalizeDashboard(await fetchPublicUsername(username), null, null, 'UTC')
      : await ownerDashboard();
    const avatarBase64 = await fetchImageAsBase64(data.profile.picture);
    // Authenticated data must still be valid after asset I/O.
    if (!publicLookup) data = await ownerDashboard();
    const { metadata, rows } = publicLookup
      ? { metadata: cardMetadata(data.profile, data.courses || []), rows: [] }
      : ownerCard(data);
    metadata.avatarBase64 = avatarBase64;
    return res.json({ metadata, rows } satisfies CardPreview);
  } catch (error) { return apiError(res, error); }
}
