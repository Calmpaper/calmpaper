import gql from 'graphql-tag'
import {
  UserFragment,
  BookFragment,
  ChapterFragment,
  LikeFragment,
  CommentFragment,
  GenreFragment,
  DonationFragment,
} from '../fragments'

export const getChapterQuery = gql`
  query($id: Int!) {
    chapter(where: { id: $id }) {
      ...Chapter
      content
      views
      book {
        ...Book
        author {
          ...User
        }
        reviews {
          id
          stars
        }
        readers {
          id
        }
      }
      author {
        ...User
        books {
          id
        }
        followers {
          id
        }
      }
      likes {
        ...Like
      }
      comments(orderBy: { createdAt: desc }) {
        ...Comment
        replies(orderBy: { createdAt: asc }) {
          ...Comment
        }
      }
    }
  }
  ${UserFragment}
  ${BookFragment}
  ${ChapterFragment}
  ${CommentFragment}
  ${LikeFragment}
`

// All:
// export const getLastChaptersQuery = gql`
//   query($skip: Int!) {
//     chaptersFeed(skip: $skip) {
//       ...Chapter
//       createdAt
//       content
//       author {
//         ...User
//       }
//       book {
//         ...Book
//         chapters {
//           id
//         }
//         genres {
//           ...Genre
//         }
//       }
//     }
//   }
//   ${UserFragment}
//   ${BookFragment}
//   ${ChapterFragment}
//   ${GenreFragment}
// `

export const getLastChaptersQuery = gql`
  query($skip: Int, $take: Int, $userId: Int!) {
    chaptersFeed(skip: $skip, take: $take, userId: $userId) {
      __typename
      ...Chapter
      createdAt
      content
      author {
        ...User
      }
      book {
        ...Book
        chapters {
          id
        }
        author {
          ...User
        }
        genres {
          ...Genre
        }
      }
      comments {
        id
      }
      likes {
        id
        author {
          id
        }
      }
    }
    chaptersFeedCount(userId: $userId)
  }
  ${UserFragment}
  ${BookFragment}
  ${ChapterFragment}
  ${GenreFragment}
`

export const getLastChaptersByAuthorQuery = gql`
  query($skip: Int!, $authorId: Int!) {
    chaptersFeedByAuthor(skip: $skip, authorId: $authorId) {
      ...Chapter
      createdAt
      content
      author {
        ...User
      }
      book {
        ...Book
        chapters {
          id
        }
        genres {
          ...Genre
        }
      }
    }
    chaptersFeedByAuthorCount(authorId: $authorId)
  }
  ${UserFragment}
  ${BookFragment}
  ${ChapterFragment}
  ${GenreFragment}
`

export const getChapterByBookQuery = gql`
  query($bookId: Int, $bookSlug: String, $skip: Int) {
    chapterByBook(bookId: $bookId, bookSlug: $bookSlug, skip: $skip) {
      ...Chapter
      content
      views
      book {
        ...Book
        author {
          ...User
        }
        reviews {
          id
          stars
        }
        readers {
          id
        }
        chapters(orderBy: { createdAt: asc }) {
          id
        }
      }
      author {
        ...User
        books {
          id
        }
        followers {
          id
        }
        stripeId
      }
      likes {
        ...Like
      }
      donations {
        ...Donation
      }
      comments(orderBy: { createdAt: desc }) {
        ...Comment
        replies(orderBy: { createdAt: asc }) {
          ...Comment
        }
      }
    }
  }
  ${UserFragment}
  ${BookFragment}
  ${ChapterFragment}
  ${CommentFragment}
  ${LikeFragment}
  ${DonationFragment}
`
