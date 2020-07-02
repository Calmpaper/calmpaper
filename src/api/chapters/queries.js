export const getChapterQuery = `
  query($id: Int!) {
    chapter(where: {
      id: $id
    }) {
      id
      title
      content
      reviews {
        stars
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
      reviews {
        stars
      }
    }
  }
`
