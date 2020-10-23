import gql from 'graphql-tag'
import { LikeFragment } from '../fragments'

export const getLikesByChapter = gql`
  query($chapterId: Int!) {
    likesByChapter(chapterId: $chapterId) {
      ...Like
      book {
        chapters {
          id
        }
      }
      chapter {
        id
        title
        book {
          id
          slug
          author {
            id
            username
          }
          chapters {
            id
          }
        }
      }
    }
  }
  ${LikeFragment}
`

// export const getAllLikesQuery = gql`
//   query {
//     likes {
//       ...Comment
//       book {
//         ...Book
//         author {
//           ...User
//         }
//       }
//       chapter {
//         ...Chapter
//         author {
//           ...User
//         }
//         book {
//           ...Book
//           chapters {
//             id
//           }
//         }
//       }
//     }
//   }
//   ${UserFragment}
//   ${LikeFragment}
//   ${BookFragment}
//   ${ChapterFragment}
// `
