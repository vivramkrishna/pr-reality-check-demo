import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession, getSession, isExpired } from '../src/session/sessionStore.js';

test('createSession stores a session', () => {
  const s = createSession('demo', 3600);
  assert.equal(getSession(s.id), s);
});

test('isExpired is false for a fresh session', () => {
  const s = createSession('demo', 3600);
  assert.equal(isExpired(s), false);
});
