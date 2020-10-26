import gql from 'graphql-tag'
import {
  UserFragment,
  BookFragment,
  ChapterFragment,
  LikeFragment,
  CommentFragment,
  GenreFragment,
  TagFragment,
  DonationFragment,
  PollFragment,
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

export const getAllChaptersQuery = gql`
  query($first: Int) {
    chapters(
      first: $first
      where: { bookId: { not: { equals: null } } }
      orderBy: { createdAt: desc }
    ) {
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
        tags {
          ...Tag
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
    chaptersCount
  }
  ${UserFragment}
  ${BookFragment}
  ${ChapterFragment}
  ${GenreFragment}
  ${TagFragment}
`

export const getLastChaptersQuery = gql`
  query($skip: Int, $take: Int, $userId: Int!) {
    chaptersFeed(skip: $skip, take: $take, userId: $userId) {
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

export const PollQuery = gql`
  query poll($chapterId: Int!) {
    poll(chapterId: $chapterId) {
      ...Poll
    }
  }
  ${PollFragment}
`
