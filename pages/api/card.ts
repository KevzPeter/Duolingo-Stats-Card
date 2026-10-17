import type { NextApiRequest, NextApiResponse } from 'next';
import { ownerDashboard } from '../../utils/server/owner-service';
import { apiError, ownerRequest } from '../../utils/server/http';
import { cardOptions } from '../../utils/server/card-options';
import { generateSvg } from '../../utils/generateSVG';
import { ownerCard } from '../../utils/server/card-metadata';
import { getDuoAnimationDataUri, fetchImageAsBase64 } from '../../utils/server/card-assets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    ownerRequest(req, res);
    const options = cardOptions(req.query);
    let data = await ownerDashboard();
    const [duoAnimationBase64, avatarBase64] = await Promise.all([
      getDuoAnimationDataUri(options.animation),
      options.showAvatar ? fetchImageAsBase64(data.profile.picture) : null,
    ]);
    // Recheck expiry after asset I/O before rendering any authenticated fields.
    data = await ownerDashboard();
    const { metadata, rows } = ownerCard(data);
    if (!options.showWeeklyXp) delete metadata.weeklyXp;
    if (!options.fields.includes('hearts')) delete metadata.hearts;
    if (!options.fields.includes('gems')) delete metadata.gems;
    metadata.duoAnimationBase64 = duoAnimationBase64;
    metadata.avatarBase64 = avatarBase64;
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.send(generateSvg(metadata, options.theme, options, rows));
  } catch (error) { return apiError(res, error); }
}
