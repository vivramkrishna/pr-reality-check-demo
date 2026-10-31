import { validate } from '../auth/authService.js';
import { REQUEST_TIMEOUT_MS } from '../config.js';

export function requireAuth(req) {
  const [scheme, token] = String(req.headers?.authorization ?? '').trim().split(/\s+/);
  const sessionId = scheme?.toLowerCase() === 'bearer' ? token : undefined;
  return validate(sessionId);
}

export function withTimeout(handler) {
  return async (req) => {
    const timer = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('504 Timeout')), REQUEST_TIMEOUT_MS).unref());
    return Promise.race([handler(req), timer]);
  };
}
