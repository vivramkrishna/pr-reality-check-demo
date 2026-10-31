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
