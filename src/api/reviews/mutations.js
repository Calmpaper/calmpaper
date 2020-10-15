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
  mutation($stars: Int!, $message: String, $authorId: Int!, $bookId: Int, $bookSlug: String) {
    createReview(
      stars: $stars
      message: $message
      authorId: $authorId
      bookId: $bookId
      bookSlug: $bookSlug
    ) {
      id
    }
  }
`

export const updateReviewMutation = `
  mutation($reviewId: Int!, $stars: Int!, $message: String) {
    updateOneReview(
      where: { id: $reviewId }
      data: {
        stars: $stars
        message: $message
      }
    ) {
      id
    }
  }
`

export const deleteReviewMutation = `
  mutation($reviewId: Int!) {
    deleteOneReview(
      where: { id: $reviewId }
    ) {
      id
    }
  }
`
