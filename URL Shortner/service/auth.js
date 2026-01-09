 const sessionIdToUser = new Map();
export function setUser(id, user) {
  sessionIdToUser.set(id, user);
}

export function getUser(id) {
  return sessionIdToUser.get(id);
}

// export { setUser, getUser };