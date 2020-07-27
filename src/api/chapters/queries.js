import gql from 'graphql-tag'
import {
  UserFragment,
  BookFragment,
  ChapterFragment,
  LikeFragment,
  CommentFragment,
  GenreFragment,
} from '../fragments'

export const getChaptersQuery = gql`
  query {
    chapters {
      id
      title
      content
      book {
        id
      }
    }
  }
`

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
      }
      author {
        ...User
        books {
          id
        }
      }
      likes {
        ...Like
      }
      comments(orderBy: { createdAt: desc }) {
        ...Comment
        replies(orderBy: { createdAt: desc }) {
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

export const getLastChaptersQuery = gql`
  query {
    chapters(orderBy: { createdAt: desc }, where: { NOT: { book: null } }) {
      ...Chapter
      createdAt
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
  }
  ${UserFragment}
  ${BookFragment}
  ${ChapterFragment}
  ${GenreFragment}
`

export const getChapterByBookQuery = gql`
  query($bookId: Int!, $skip: Int) {
    chapterByBook(bookId: $bookId, skip: $skip) {
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
        chapters(orderBy: { createdAt: asc }) {
          id
        }
      }
      author {
        ...User
        books {
          id
        }
      }
      likes {
        ...Like
      }
      comments(orderBy: { createdAt: desc }) {
        ...Comment
        replies(orderBy: { createdAt: desc }) {
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
