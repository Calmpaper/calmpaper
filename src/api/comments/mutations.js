import gql from 'graphql-tag'
import { BookFragment, ChapterFragment } from '../fragments'

export const sendBookCommentMutation = gql`
  mutation($body: String!, $bookId: Int, $userId: Int!) {
    sendBookComment(body: $body, bookId: $bookId, userId: $userId) {
      id
      body
      createdAt
      author {
        id
        fullname
        avatar
      }
    }
  }
`

export const sendChapterCommentMutation = gql`
  mutation($body: String!, $chapterId: Int, $userId: Int!) {
    sendChapterComment(body: $body, chapterId: $chapterId, userId: $userId) {
      id
      body
      createdAt
      author {
        id
        fullname
        avatar
      }
    }
  }
`

export const sendCommentReplyMutation = gql`
  mutation($body: String!, $commentId: Int!, $userId: Int!) {
    replyToComment(body: $body, commentId: $commentId, userId: $userId) {
      id
      body
      createdAt
      book {
        ...Book
      }
      chapter {
        ...Chapter
        book {
          ...Book
        }
      }
      author {
        id
        fullname
        avatar
      }
      replies {
        id
        body
        createdAt
        book {
          ...Book
        }
        chapter {
          ...Chapter
        }
        author {
          id
          fullname
          avatar
        }
      }
    }
  }
  ${BookFragment}
  ${ChapterFragment}
`

export const deleteCommentMutation = gql`
  mutation($id: Int!) {
    deleteOneComment(where: { id: $id }) {
      id
    }
  }
`

export const editCommentMutation = gql`
  mutation($id: Int!, $body: String!) {
    updateOneComment(where: { id: $id }, data: { body: $body }) {
      id
      body
    }
  }
`
