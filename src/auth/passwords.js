const DEMO_USERS = { demo: 'demo123' };

export function checkPassword(username, password) {
  return DEMO_USERS[username] === password;
}
