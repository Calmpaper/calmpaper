export const createBookMutation = `
  mutation($name: String!, $description: String!) {
    createOneBook(data: {
      name: $name
      description: $description
    }) {
      id
      name
      description
    }
  }
`

export const createChapterMutation = `
  mutation($title: String!, $content: String!, $bookId: Int!) {
    createOneChapter(data: {
      book: {
        connect: {
          id: $bookId
        }
      }
      title: $title
      content: $content
    }) {
      id
      title
      content
    }
  }
`
