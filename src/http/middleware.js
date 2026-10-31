import { validate } from '../auth/authService.js';
import { REQUEST_TIMEOUT_MS } from '../config.js';

export function requireAuth(req) {
  const sessionId = req.headers?.authorization?.replace(/^Bearer /, '');
  return validate(sessionId);
}

export function withTimeout(handler) {
  return async (req) => {
    let timeoutId;
    const timer = new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error('504 Timeout')), REQUEST_TIMEOUT_MS);
    });
    return Promise.race([handler(req), timer]).finally(() => clearTimeout(timeoutId));
  };
}
