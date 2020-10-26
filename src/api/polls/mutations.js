import gql from 'graphql-tag'

export const deletePollMutation = gql`
  mutation($chapterId: Int!) {
    deleteOnePoll(where: { chapterId: $chapterId }) {
      id
    }
  }
`
