# pr-reality-check-demo

**Synthetic demo fixtures for PR Reality Check — not a real project.**

A tiny session/auth service used to demo [PR Reality Check](https://github.com/vivramkrishna/MLH_PR_CHECK).
`main` contains a deliberate bug: session TTL (seconds) is added to a millisecond timestamp,
so sessions expire a few seconds after login (issue #1).

```bash
npm test
```
