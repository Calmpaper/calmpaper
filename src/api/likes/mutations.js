import gql from 'graphql-tag'
import {
  UserFragment,
  BookFragment,
  ChapterFragment,
  ReviewFragment,
} from '../fragments'

export const setLikeMutation = gql`
  mutation($authorId: Int!, $commentId: Int!) {
    setCommentLike(authorId: $authorId, commentId: $commentId) {
      id
      comment {
        id
        body
        author {
          ...User
        }
        book {
          ...Book
        }
        chapter {
          ...Chapter
          book {
            ...Book
          }
        }
        parent {
          id
          book {
            ...Book
          }
          chapter {
            ...Chapter
            book {
              ...Book
            }
          }
        }
      }
      author {
        ...User
      }
    }
  }
  ${UserFragment}
  ${BookFragment}
  ${ChapterFragment}
`

export const setChapterLike = gql`
  mutation($authorId: Int!, $chapterId: Int!) {
    setChapterLike(authorId: $authorId, chapterId: $chapterId) {
      id
      author {
        ...User
      }
    }
  }
  ${UserFragment}
`

// export const removeLikeMutation = gql`
//   mutation($likeId: Int!) {
//     removeLike(likeId: $likeId) {
//       id
//     }
//   }
// `

export const removeLikeMutation = gql`
  mutation($likeId: Int!) {
    deleteOneLike(where: { id: $likeId }) {
      id
    }
  }
`

export const setReviewLikeMutation = gql`
  mutation($authorId: Int!, $reviewId: Int!) {
    createOneLike(
      data: {
        author: { connect: { id: $authorId } }
        review: { connect: { id: $reviewId } }
      }
    ) {
      id
      review {
        ...Review
        likes {
          id
        }
        author {
          ...User
        }
      }
      author {
        ...User
      }
    }
  }
  ${UserFragment}
  ${ReviewFragment}
`
