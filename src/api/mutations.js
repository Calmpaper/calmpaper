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

export const setRatingMutation = `
  mutation($id: Int, $stars: Int!, $bookId: Int, $chapterId: Int, $voiceId: Int) {
    setRating(id: $id, stars: $stars, bookId: $bookId, chapterId: $chapterId, voiceId: $voiceId) {
      id
      stars
      book {
        ratings {
          stars
        }
      }
      chapter {
        ratings {
          stars
        }
      }
      voice {
        ratings {
          stars
        }
      }
      author {
        username
      }
    }
  }
`
