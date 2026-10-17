import type { NextApiRequest, NextApiResponse } from 'next';
import { ownerDashboard } from '../../utils/server/owner-service';
import { apiError, ownerRequest } from '../../utils/server/http';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    ownerRequest(req, res);
    return res.json(await ownerDashboard());
  } catch (error) { return apiError(res, error); }
}
