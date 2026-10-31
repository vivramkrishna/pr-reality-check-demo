export function getProfile(userId) {
  const name = String(userId);
  return { userId, name: `Demo user ${name.charAt(0).toUpperCase()}${name.slice(1)}` };
}
