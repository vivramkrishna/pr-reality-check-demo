import { validate } from '../auth/authService.js';
import { REQUEST_TIMEOUT_MS } from '../config.js';

export function requireAuth(req) {
  // RFC 7235: the auth scheme is case-insensitive ("Bearer", "bearer", "BEARER").
  const header = String(req.headers?.authorization ?? '');
  const sessionId = header.replace(/^bearer\s+/i, '').trim();
  return validate(sessionId);
}

export function withTimeout(handler) {
  return async (req) => {
    const timer = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('504 Timeout')), REQUEST_TIMEOUT_MS).unref());
    return Promise.race([handler(req), timer]);
  };
}
