import gql from 'graphql-tag'
import { UserFragment, BookFragment } from '../fragments'

export const getUserQuery = gql`
  query($id: Int!) {
    user(where: { id: $id }) {
      ...User
      favoriteBooks {
        ...Book
        chapters {
          id
        }
      }
      books {
        ...Book
        reviews {
          stars
        }
      }
    }
  }
  ${UserFragment}
  ${BookFragment}
`

export const getMeQuery = gql`
  query {
    me {
      ...User
      givenname
      getStreamToken
      favoriteBooks {
        ...Book
        chapters {
          id
        }
      }
      following {
        id
      }
    }
  }
  ${UserFragment}
  ${BookFragment}
`
