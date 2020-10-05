import gql from 'graphql-tag'
import {
  // UserFragment,
  // BookFragment,
  // ChapterFragment,
  // TagFragment,
  CommentFragment,
} from '../fragments'

export const getCommentsFeedQuery = gql`
  query($users: [Int!]) {
    comments(
      where: { author: { id: { in: $users } } }
      orderBy: { createdAt: desc }
    ) {
      ...Comment
      chapter {
        id
        title
      }
      book {
        id
        name
      }
    }
  }
  ${CommentFragment}
`
