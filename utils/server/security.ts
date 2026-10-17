import { AppError } from './errors';

// Claims are untrusted until the protected Duolingo endpoint accepts the token.
export function readTokenClaims(token: unknown, now = Date.now()): { id: string; expiresAt: Date } {
  try {
    if (typeof token !== 'string' || token.length > 8192 || !/^[\w-]+\.[\w-]+\.[\w-]+$/.test(token)) throw new Error('Invalid token format');
    const [header, payload] = token.split('.').slice(0, 2).map(part => JSON.parse(Buffer.from(part, 'base64url').toString('utf8')));
    if (!header.alg || header.alg.toLowerCase() === 'none') throw new Error('Invalid token algorithm');
    const id = String(payload.sub);
    if (!/^[1-9]\d{0,15}$/.test(id) || !Number.isSafeInteger(Number(id))) throw new Error('Invalid token subject');
    if (typeof payload.exp !== 'number' || !Number.isFinite(payload.exp) || payload.exp * 1000 <= now) throw new Error('Invalid or expired token');
    if (payload.nbf != null && (typeof payload.nbf !== 'number' || payload.nbf * 1000 > now)) throw new Error('Token is not yet valid');
    const expiresAt = new Date(payload.exp * 1000);
    if (!Number.isFinite(expiresAt.getTime())) throw new Error('Invalid token expiry');
    return { id, expiresAt };
  } catch {
    throw new AppError(400, 'invalid_token', 'Enter a valid, unexpired Duolingo JWT token.');
  }
}

export function validTimeZone(value: unknown): string {
  if (typeof value !== 'string' || value.length > 100) throw new AppError(400, 'time_zone', 'Choose a valid IANA time zone.');
  try { new Intl.DateTimeFormat('en-US', { timeZone: value }).format(); return value; }
  catch { throw new AppError(400, 'time_zone', 'Choose a valid IANA time zone.'); }
}
