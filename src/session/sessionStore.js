import crypto from 'node:crypto';
import { now, toMs } from '../utils/time.js';

const sessions = new Map();

export function createSession(userId, ttlSeconds) {
  const session = { id: crypto.randomUUID(), userId, expiresAt: now() + toMs(ttlSeconds) };
  sessions.set(session.id, session);
  return session;
}

export function getSession(id) {
  return sessions.get(id) ?? null;
}

export function isExpired(session) {
  return now() > session.expiresAt;
}
