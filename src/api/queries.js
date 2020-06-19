export const getUserQuery = `
  query($username: String!) {
    user(where: {
      username: $username
    }) {
      id
      username
      avatar
      ratings {
        stars
      }
      books {
        id
        name
        image
        ratings {
          stars
        }
      }
    }
  }
`

export const getBooksQuery = `
  query {
    books {
      id
      name
      description
      chapters {
        title
        image
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
      ratings {
        stars
      }
      author {
        username
        avatar
      }
      chapters {
        id
        title
        voices {
          id
        }
      }
    }
  }
`

export const getChapterQuery = `
  query($id: Int!) {
    chapter(where: {
      id: $id
    }) {
      id
      title
      content
      ratings {
        stars
      }
      voices {
        id
        url
        author {
          username
          avatar
        }
      }
    }
  }
`

export const getChapterByBookQuery = `
  query($bookId: Int!, $skip: Int) {
    chapterByBook(bookId: $bookId, skip: $skip) {
      id
      title
      content
      ratings {
        stars
      }
      voices {
        id
        url
        author {
          username
          avatar
        }
      }
    }
  }
`
