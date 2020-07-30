import gql from 'graphql-tag'

export const getTagsQuery = gql`
  query {
    tags {
      id
      label
    }
  }
`
