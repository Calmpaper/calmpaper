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
    books(where: { archived: { not: { equals: null } } }) {
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

export const getBooksByAuthorQuery = gql`
  query($authorId: Int!) {
    books(where: { author: { id: { equals: $authorId } } }) {
      ...Book
      createdAt
      description
      views
      chapters {
        ...Chapter
      }
      reviews {
        stars
      }
      author {
        ...User
      }
      readers {
        id
      }
      tags {
        ...Tag
      }
    }
  }
  ${UserFragment}
  ${BookFragment}
  ${ChapterFragment}
  ${TagFragment}
`

export const getFollowedBooksQuery = gql`
  query($userId: Int!) {
    books(
      where: {
        OR: [
          { readers: { some: { id: { equals: $userId } } } }
          { author: { followers: { some: { id: { equals: $userId } } } } }
          { author: { id: { equals: $userId } } }
        ]
      }
    ) {
      ...Book
      description
      reviews {
        stars
      }
      chapters {
        ...Chapter
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
  query($first: Int) {
    books(
      orderBy: { createdAt: desc }
      where: { archived: { not: { equals: true } } }
      first: $first
    ) {
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

      readers {
        id
      }
      tags {
        ...Tag
      }
    }
    booksCount
  }
  ${UserFragment}
  ${BookFragment}
  ${ChapterFragment}
  ${TagFragment}
`

export const topRatedBooksQuery = gql`
  query($skip: Int, $take: Int) {
    topRatedBooks(take: $take, skip: $skip) {
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

      readers {
        id
      }
      tags {
        ...Tag
      }
    }   
  }
  ${UserFragment}
  ${BookFragment}
  ${ChapterFragment}
  ${TagFragment}
`

export const getBookQuery = gql`
  query($slug: String, $id: Int) {
    book(where: { slug: $slug, id: $id }) {
      ...Book
      rank
      rating
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
        stripeId
      }
      chapters {
        ...Chapter
      }
      readers {
        id
      }
      comments(orderBy: { createdAt: desc }) {
        ...Comment
        replies(orderBy: { createdAt: asc }) {
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
