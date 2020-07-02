export const getBooksQuery = `
  query {
    books {
      id
      name
      description
      image
      chapters {
        id
        title
        image
      }
      reviews {
        stars
      }
    }
  }
`

export const getBookQuery = `
  query($id: Int!) {
    book(where: {
      id: $id
    }) {
      id
      name
      description
      image
      reviews {
        stars
      }
      author {
        username
        avatar
      }
      chapters {
        id
        title
      }
    }
  }
`
