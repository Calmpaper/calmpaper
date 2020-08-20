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

export const getLastChaptersQuery = gql`
  query($skip: Int!) {
    chaptersFeed(skip: $skip) {
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
