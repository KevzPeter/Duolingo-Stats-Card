import type { NextApiRequest, NextApiResponse } from 'next'
import { generateSvg } from '../../utils/generateSVG';
import axios from 'axios';
import { THEME_NAMES } from "../../utils/config";
import { Metadata, Params } from '../../utils/models';
import { crownSort, xpSort } from "../../utils/sort";
import { sampleData } from '../../utils/sample-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>): Promise<any> {
    try {
        let { username, id, theme, sort }: Params = <any>req.query;
        // username / id query validation
        if ((!username?.trim().length) && (!id?.trim().length)) {
            return res.status(400).send({
                status: 'error',
                body: 'Missing username / id parameter in query'
            });
        }
        //theme query validation
        if (!theme || theme.length === 0) {
            theme = null;
        }
        else theme = theme.trim().toLowerCase();
        if (!THEME_NAMES.includes(theme)) {
            theme = null;
        }
        // sort query validation
        if (!sort || typeof sort !== 'string' || !sort.length || sort.trim().toLowerCase() !== 'xp') {
            sort = null;
        }
        else sort = sort.trim().toLowerCase();

        const headers = {
            'User-Agent': 'duolingo-stats-card',
            'Content-Type': 'application/json',
        };

        const axiosConfig = {
            headers: headers
        };
        let path = "users";
        if (username) {
            path += `?username=${username}`;
        }
        else {
            path += `/${id}`
        }

        const response = await axios.get(`https://www.duolingo.com/2017-06-30/${path}`, axiosConfig);
        const metadata: Metadata = username ? response.data.users[0] : response.data;

        if (sort === 'xp') {
            // Sort the courses by xp
            xpSort(metadata);
        }
        else {
            // Sort the courses by crown count
            crownSort(metadata);
        }
        // Set cache options
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(generateSvg(metadata, theme, sort));
    }
    catch (err: any) {
        console.error(err.message);
        res.status(500).send({
            status: 'error',
            body: 'The user does not exist 🔍 or some other error occured 😔'
        });
    }
}
