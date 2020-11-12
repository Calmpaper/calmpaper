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
    followUser(followingId: $followingId, followerId: $followerId) {
      id
      ...User
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
    unfollowUser(followingId: $followingId, followerId: $followerId) {
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
  mutation(
    $userId: Int!
    $username: String
    $fullname: String
    $avatar: String
    $bio: String
  ) {
    updateOneUser(
      where: { id: $userId }
      data: {
        username: { set: $username }
        fullname: { set: $fullname }
        givenname: { set: $fullname }
        firstname: { set: $fullname }
        avatar: { set: $avatar }
        bio: { set: $bio }
      }
    ) {
      id
      username
      fullname
      givenname
      firstname
      avatar
      bio
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
