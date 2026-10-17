import axios from 'axios';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { DUO_ANIMATIONS, DuoAnimation, selectDuoAnimation } from '../animations';

const animationCache: Partial<Record<typeof DUO_ANIMATIONS[number]['file'], Promise<string | null>>> = {};
const avatarCache = new Map<string, { until: number; promise: Promise<string | null> }>();

export async function getDuoAnimationDataUri(animation?: DuoAnimation): Promise<string | null> {
  const selected = selectDuoAnimation(animation);
  const fileName = selected.file;
  if (animationCache[fileName] !== undefined) return animationCache[fileName];
  const request = fs.readFile(path.join(process.cwd(), 'public', 'webp', fileName))
    .then(bytes => `data:image/webp;base64,${bytes.toString('base64')}`)
    .catch(() => { delete animationCache[fileName]; return null; });
  animationCache[fileName] = request;
  return request;
}

export async function fetchImageAsBase64(value: string): Promise<string | null> {
  try {
    if (typeof value !== 'string' || !value || value.length > 4096) return null;
    let url = value;
    if (value.startsWith('//')) url = `https:${value}`;
    else if (!value.startsWith('http')) url = `https://${value}`;
    const parsed = new URL(url);
    const allowedHost = parsed.hostname === 'simg-ssl.duolingo.com' ||
      (parsed.hostname === 'd3gq3s1iyyx31w.cloudfront.net' && parsed.pathname.startsWith('/static/render/'));
    if (parsed.protocol !== 'https:' || !allowedHost || parsed.username || parsed.password || parsed.port) return null;
    if (!/\/(xlarge|large|medium)(?:\/|$)/.test(parsed.pathname)) parsed.pathname += '/large';
    const key = parsed.href;
    const cached = avatarCache.get(key);
    if (cached && cached.until > Date.now()) return cached.promise;
    // Bounded to 16 images (2 MB each before base64), with in-flight deduplication.
    if (avatarCache.size >= 16) avatarCache.delete(avatarCache.keys().next().value);
    const promise = downloadAvatar(key).then(image => {
      if (!image && avatarCache.get(key)?.promise === promise) avatarCache.delete(key);
      return image;
    });
    avatarCache.set(key, { until: Date.now() + 60000, promise });
    return promise;
  } catch { return null; }
}

async function downloadAvatar(url: string): Promise<string | null> {
  try {
    // Separate public image request: never attach the account's Authorization header.
    const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 8000, maxRedirects: 0, maxContentLength: 2 * 1024 * 1024 });
    const contentType = response.headers['content-type'];
    if (typeof contentType !== 'string') return null;
    const type = contentType.split(';')[0];
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(type)) return null;
    return `data:${type};base64,${Buffer.from(response.data).toString('base64')}`;
  } catch { return null; }
}
