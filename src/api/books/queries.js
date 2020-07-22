import gql from 'graphql-tag'
import {
  UserFragment,
  BookFragment,
  ChapterFragment,
  LikeFragment,
  CommentFragment,
  GenreFragment,
  TagFragment,
} from '../fragments'

export const getBooksQuery = gql`
  query {
    books {
      ...Book
      description
      chapters {
        ...Chapter
      }
      reviews {
        stars
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

export const getLatestBooksQuery = gql`
  query {
    books(orderBy: { createdAt: desc }) {
      ...Book
      description
      chapters {
        ...Chapter
      }
      reviews {
        stars
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

export const getBookQuery = gql`
  query($id: Int!) {
    book(where: { id: $id }) {
      ...Book
      description
      views
      reviews {
        id
        stars
        message
        author {
          ...User
        }
        likes {
          ...Like
        }
      }
      author {
        ...User
        books {
          ...Book
          views
          author {
            ...User
            givenname
          }
          reviews {
            id
            message
            stars
            author {
              ...User
            }
          }
        }
        followers {
          id
        }
      }
      chapters {
        ...Chapter
      }
      readers {
        id
      }
      comments(orderBy: { createdAt: desc }) {
        ...Comment
        replies(orderBy: { createdAt: desc }) {
          ...Comment
        }
      }
      genres {
        ...Genre
      }
      tags {
        ...Tag
      }
    }
  }
  ${UserFragment}
  ${BookFragment}
  ${ChapterFragment}
  ${LikeFragment}
  ${CommentFragment}
  ${GenreFragment}
  ${TagFragment}
`
