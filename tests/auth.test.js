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

test('login ignores username case and surrounding spaces (regression for #6)', () => {
  for (const name of ['Demo', ' demo ', 'DEMO\t']) {
    assert.equal(login(name, 'demo123').userId, 'demo', JSON.stringify(name));
  }
});

test('login does not match inherited object keys', () => {
  assert.throws(() => login('constructor', undefined), /401/);
});
