export const createBookMutation = `
  mutation($name: String!, $description: String!, $username: String!, $image: String) {
    createOneBook(data: {
      name: $name
      description: $description
      image: $image,
      author: {
        connect: {
          username: $username
        }
      }
    }) {
      id
      name
      description
      image
    }
  }
`
