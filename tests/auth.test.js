import test from 'node:test';
import assert from 'node:assert/strict';
import { login, validate } from '../src/auth/authService.js';

test('login returns a session that validates', () => {
  const s = login('demo', 'demo123');
  assert.equal(validate(s.id).userId, 'demo');
});

test('login rejects a wrong password', () => {
  assert.throws(() => login('demo', 'nope'), /401/);
});
