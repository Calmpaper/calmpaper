import gql from 'graphql-tag'

export const getGenresQuery = gql`
  query {
    genres {
      id
      label
    }
  }
`
