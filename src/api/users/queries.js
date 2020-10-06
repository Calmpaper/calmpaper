import gql from 'graphql-tag'
import { UserFragment, BookFragment } from '../fragments'

export const getUserQuery = gql`
  query($username: String, $id: Int) {
    user(where: { username: $username, id: $id }) {
      ...User
      givenname
      getStreamToken
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
      followers {
        ...User
      }
      following {
        ...User
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
      books {
        id
      }
      following {
        id
      }
      invited {
        id
      }
    }
  }
  ${UserFragment}
  ${BookFragment}
`
