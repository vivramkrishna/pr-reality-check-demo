export function getProfile(userId) {
  const id = String(userId ?? '').trim();
  return { userId: id, name: `Demo user ${id}`, displayName: id || 'anonymous' };
}
