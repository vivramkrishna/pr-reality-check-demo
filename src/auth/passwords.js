const DEMO_USERS = { demo: 'demo123' };

export function checkPassword(username, password) {
  const key = String(username ?? '').trim().toLowerCase();
  return Object.hasOwn(DEMO_USERS, key) && DEMO_USERS[key] === password;
}
