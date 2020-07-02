export const getUserQuery = `
  query($username: String!) {
    user(where: {
      username: $username
    }) {
      id
      username
      avatar
      books {
        id
        name
        image
        reviews {
          stars
        }
      }
    }
  }
`
