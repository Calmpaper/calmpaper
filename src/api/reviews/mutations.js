export const setRatingMutation = `
  mutation(
    $id: Int,
    $stars: Int!,
    $authorUsername: String!
    $bookId: Int,
  ) {
    setRating(
    id: $id,
    stars: $stars,
    authorUsername: $authorUsername
    bookId: $bookId,
    ) {
      id
      stars
      book {
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
