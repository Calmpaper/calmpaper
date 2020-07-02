export const createChapterMutation = `
  mutation($title: String!, $content: String!, $bookId: Int!, $username: String!) {
    createOneChapter(data: {
      title: $title
      content: $content
      author: {
        connect: {
          username: $username
        }
      }
      book: {
        connect: {
          id: $bookId
        }
      }
    }) {
      id
      title
      content
    }
  }
`
