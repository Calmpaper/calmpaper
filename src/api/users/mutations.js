export const createUserMutation = `
  mutation($username: String!, $avatar: String) {
    createOneUser(data: {
      username: $username
      avatar: $avatar
    }) {
      id
      username
      avatar
    }
  }
`
