import gql from 'graphql-tag'
import { UserFragment, BookFragment } from '../fragments'

// where: { id: $userId }
// data: { favoriteBooks: { connect: { id: $bookId } } }
// where: { id: $userId }
// data: { favoriteBooks: { disconnect: { id: $bookId } } }
export const addBookToFavoritesMutation = gql`
  mutation($bookId: Int!, $userId: Int!) {
    addBookToFavorites(bookId: $bookId, userId: $userId) {
      id
      favoriteBooks {
        ...Book
      }
    }
  }
  ${BookFragment}
`

export const removeBookFromFavoritesMutation = gql`
  mutation($bookId: Int!, $userId: Int!) {
    removeBookFromFavorites(bookId: $bookId, userId: $userId) {
      id
      favoriteBooks {
        id
      }
    }
  }
`

export const followUserMutation = gql`
  mutation($followingId: Int!, $followerId: Int!) {
    updateOneUser(
      where: { id: $followerId }
      data: { following: { connect: { id: $followingId } } }
    ) {
      id
      following {
        ...User
      }
      followers {
        ...User
      }
    }
  }
  ${UserFragment}
`

export const updateUserMutation = gql`
  mutation($stripeId: Int!, $userId: Int!) {
    updateOneUser(where: { id: $userId }, data: { stripeId: $stripeId }) {
      id
      following {
        ...User
      }
      followers {
        ...User
      }
      stripeId
    }
  }
  ${UserFragment}
`

export const unfollowUserMutation = gql`
  mutation($followingId: Int!, $followerId: Int!) {
    updateOneUser(
      where: { id: $followerId }
      data: { following: { disconnect: { id: $followingId } } }
    ) {
      id
      following {
        ...User
      }
      followers {
        ...User
      }
    }
  }
  ${UserFragment}
`

export const editUserMutation = gql`
  mutation($userId: Int!, $username: String, $avatar: String) {
    updateOneUser(
      where: { id: $userId }
      data: { username: $username, avatar: $avatar }
    ) {
      id
      username
      avatar
    }
  }
`

export const signupMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`

export const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`
