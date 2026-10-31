import { createSession, getSession, isExpired } from '../session/sessionStore.js';
import { checkPassword } from './passwords.js';
import { SESSION_TTL_SECONDS } from '../config.js';

export function login(username, password) {
  if (!checkPassword(username, password)) throw new Error('401 Invalid credentials');
  return createSession(username, SESSION_TTL_SECONDS);
}

export function validate(sessionId) {
  const session = getSession(sessionId);
  if (!session) throw new Error('401 Unknown session');
  if (isExpired(session)) throw new Error('401 Session expired');
  return session;
}
