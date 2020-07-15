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
