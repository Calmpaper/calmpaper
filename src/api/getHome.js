import gql from 'graphql-tag'
import client from './client'
import {
  UserFragment,
  BookFragment,
  ChapterFragment,
  GenreFragment,
} from './fragments'

const getBooksQuery = `
  query books {
    books {
      id
      name
      image
    }
  }
`

export const getBooks = async () => {
  const {
    data: { books },
  } = await client.query(getBooksQuery).toPromise()

  return books
}

const getHomeQuery = gql`
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

export const getHome = async () => {
  const { data } = await client.query(getHomeQuery).toPromise()

  return data
}
