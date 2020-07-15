export const setRatingMutation = `
  mutation(
    $id: Int,
    $stars: Int!,
    $authorUsername: String!
    $bookId: Int,
  ) {
    setReview(
    id: $id,
    stars: $stars,
    authorUsername: $authorUsername
    bookId: $bookId,
    ) {
      id
      stars
      book {
        reviews {
          stars
        }
      }
      author {
        fullname
      }
    }
  }
`

export const addReviewMutation = `
  mutation($stars: Int!, $message: String, $authorId: Int!, $bookId: Int!) {
    createOneReview(data: {
      stars: $stars
      message: $message
      author: {
        connect: {
          id: $authorId
        }
      }
      book: {
        connect: {
          id: $bookId
        }
      }
    }) {
      id
    }
  }
`
