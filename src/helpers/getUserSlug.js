export const getUserSlug = (user) =>
  user.username ? `@${user.username}` : `@user${user.id}`
