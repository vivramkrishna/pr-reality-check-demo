import { login } from '../auth/authService.js';
import { requireAuth, withTimeout } from './middleware.js';
import { getProfile } from '../profile/profileService.js';

export function handleLogin(req) {
  const session = login(req.body?.username, req.body?.password);
  return { status: 200, body: { sessionId: session.id } };
}

export function handleProfile(req) {
  const session = requireAuth(req);
  return { status: 200, body: getProfile(session.userId) };
}

export function health() {
  return { status: 200, body: { ok: true } };
}

async function retryDispatch(handler, req, attempts = 2) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await withTimeout(handler)(req);
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

export async function dispatch(req) {
  const routes = { 'POST /login': handleLogin, 'GET /profile': handleProfile, 'GET /health': health };
  const handler = routes[`${req.method} ${req.path}`];
  if (!handler) return { status: 404, body: { error: 'Not found' } };
  try {
    return await retryDispatch(handler, req);
  } catch (err) {
    return { status: Number.parseInt(err.message, 10) || 500, body: { error: err.message } };
  }
}
