import gql from 'graphql-tag'
import { UserFragment, BookFragment } from '../fragments'

export const getUserQuery = gql`
  query($id: Int, $username: String) {
    user(where: { id: $id, username: $username }) {
      ...User
      givenname
      favoriteBooks {
        ...Book
        author {
          ...User
        }
        chapters {
          id
        }
      }
      books {
        ...Book
        reviews {
          stars
        }
        author {
          ...User
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
      firstname
      givenname
      email
      username
      getStreamToken
      stripeId
      favoriteBooks {
        ...Book
        author {
          ...User
        }
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
