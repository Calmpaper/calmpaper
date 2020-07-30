import gql from 'graphql-tag'

export const UserFragment = gql`
  fragment User on User {
    id
    fullname
    username
    avatar
  }
`

export const BookFragment = gql`
  fragment Book on Book {
    id
    name
    image
  }
`

export const ChapterFragment = gql`
  fragment Chapter on Chapter {
    id
    title
    createdAt
  }
`

export const LikeFragment = gql`
  fragment Like on Like {
    id
    author {
      ...User
    }
  }
  ${UserFragment}
`

export const CommentFragment = gql`
  fragment Comment on Comment {
    id
    body
    createdAt
    isChild
    author {
      ...User
    }
    likes {
      ...Like
    }
  }
  ${UserFragment}
  ${LikeFragment}
`

export const GenreFragment = gql`
  fragment Genre on Genre {
    id
    label
  }
`

export const TagFragment = gql`
  fragment Tag on Tag {
    id
    label
  }
`

export const ReviewFragment = gql`
  fragment Review on Review {
    id
    stars
    message
  }
`

export const BooksFragment = gql`
  fragment Books on Book {
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

export const ChaptersFragment = gql`
  fragment Chapters on Chapter {
    chapters {
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
