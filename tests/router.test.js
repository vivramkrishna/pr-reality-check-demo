import test from 'node:test';
import assert from 'node:assert/strict';
import { dispatch } from '../src/http/router.js';

test('GET /health returns 200', async () => {
  const res = await dispatch({ method: 'GET', path: '/health' });
  assert.equal(res.status, 200);
});

test('unknown route returns 404', async () => {
  const res = await dispatch({ method: 'GET', path: '/nope' });
  assert.equal(res.status, 404);
});

test('GET /profile accepts a lowercase bearer scheme (regression for #5)', async () => {
  const login = await dispatch({ method: 'POST', path: '/login', body: { username: 'demo', password: 'demo123' } });
  for (const scheme of ['Bearer', 'bearer', 'BEARER']) {
    const res = await dispatch({ method: 'GET', path: '/profile', headers: { authorization: `${scheme} ${login.body.sessionId}` } });
    assert.equal(res.status, 200, scheme);
  }
});
