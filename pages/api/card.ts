import type { NextApiRequest, NextApiResponse } from 'next';
import { apiError, ownerRequest } from '../../utils/server/http';
import { cardOptions } from '../../utils/server/card-options';
import { renderOwnerCard } from '../../utils/server/render-owner-card';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    ownerRequest(req, res);
    const options = cardOptions(req.query);
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.send(await renderOwnerCard(options));
  } catch (error) { return apiError(res, error); }
}
