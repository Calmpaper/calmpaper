import gql from 'graphql-tag'

export const createBookMutation = gql`
  mutation(
    $name: String!
    $description: String!
    $image: String
    $tags: [Int]
    $genres: [Int]
  ) {
    createBook(
      name: $name
      description: $description
      image: $image
      tags: $tags
      genres: $genres
    ) {
      id
      slug
      name
      description
      image
      author {
        id
        fullname
        avatar
      }
    }
  }
`

export const updateBookMutation = gql`
  mutation(
    $name: String!
    $description: String!
    $image: String
    $userId: Int!
    $bookId: Int!
  ) {
    updateOneBook(
      where: { id: $bookId }
      data: {
        name: $name
        description: $description
        image: $image
        author: { connect: { id: $userId } }
      }
    ) {
      id
      slug
      name
      description
      image
      author {
        id
        fullname
        avatar
      }
    }
  }
`

export const deleteBookMutation = gql`
  mutation($id: Int!) {
    deleteOneBook(where: { id: $id }) {
      id
    }
  }
`

export const incrementBookViewsMutation = gql`
  mutation($bookId: Int, $bookSlug: String) {
    incrementBookViews(bookId: $bookId, bookSlug: $bookSlug) {
      id
      name
      views
    }
  }
`
