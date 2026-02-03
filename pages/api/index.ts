import type { NextApiRequest, NextApiResponse } from 'next'
import { generateSvg } from '../../utils/generateSVG';
import axios from 'axios';
import { THEME_NAMES } from "../../utils/config";
import { Metadata, Params } from '../../utils/models';
import { sortCourses } from "../../utils/sort";

/**
 * Fetches an image and converts it to a base64 data URI
 */
async function fetchImageAsBase64(url: string): Promise<string | null> {
    try {
        // Normalize the URL
        let fullUrl = url;
        if (url.startsWith('//')) {
            fullUrl = `https:${url}`;
        } else if (!url.startsWith('http')) {
            fullUrl = `https://${url}`;
        }
        
        // Append /xlarge for better quality avatar
        if (!fullUrl.includes('/xlarge') && !fullUrl.includes('/large') && !fullUrl.includes('/medium')) {
            fullUrl = `${fullUrl}/xlarge`;
        }
        
        console.log("[v0] Fetching avatar from:", fullUrl);
        
        const response = await axios.get(fullUrl, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.duolingo.com/',
            },
            timeout: 10000,
        });
        
        const contentType = response.headers['content-type'] || 'image/png';
        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        console.log("[v0] Avatar fetched successfully, content-type:", contentType, "size:", base64.length);
        return `data:${contentType};base64,${base64}`;
    } catch (error: any) {
        console.error('[v0] Failed to fetch avatar image:', error.message, error.response?.status);
        return null;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>): Promise<any> {
    try {
        let { username, id, theme }: Params = <any>req.query;
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
        // Sort courses by XP, since crowns are deprecated
        sortCourses(metadata, "xp");
        
        // Fetch avatar image and convert to base64 for embedding in SVG
        console.log("[v0] metadata.picture:", metadata.picture);
        if (metadata.picture) {
            const avatarBase64 = await fetchImageAsBase64(metadata.picture);
            console.log("[v0] avatarBase64 fetched:", avatarBase64 ? `${avatarBase64.substring(0, 50)}...` : null);
            if (avatarBase64) {
                metadata.avatarBase64 = avatarBase64;
            }
        }
        
        // Set cache options
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(generateSvg(metadata, theme));
    }
    catch (err: any) {
        console.error(err.message);
        res.status(500).send({
            status: 'error',
            body: 'The user does not exist 🔍 or some other error occured 😔'
        });
    }
}
