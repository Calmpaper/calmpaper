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

export const createBookMutation = `
  mutation($name: String!, $description: String!, $username: String!) {
    createOneBook(data: {
      name: $name
      description: $description
      author: {
        connect: {
          username: $username
        }
      }
    }) {
      id
      name
      description
    }
  }
`

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

export const setRatingMutation = `
  mutation(
    $id: Int,
    $stars: Int!,
    $authorUsername: String!
    $userId: Int,
    $bookId: Int,
    $chapterId: Int,
    $voiceId: Int,
  ) {
    setRating(
    id: $id,
    stars: $stars,
    authorUsername: $authorUsername
    userId: $userId,
    bookId: $bookId,
    chapterId: $chapterId,
    voiceId: $voiceId,
    ) {
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
      user {
        username
        ratings {
          stars
        }
      }
    }
  }
`
