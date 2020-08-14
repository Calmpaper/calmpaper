import gql from 'graphql-tag'

export const newChapterDonationMutation = gql`
  mutation($chapterId: Int!, $amount: Int!, $message: String) {
    newChapterDonation(
      chapterId: $chapterId
      amount: $amount
      message: $message
    ) {
      id
      paymentRequestSecret
    }
  }
`

export const newBookDonationMutation = gql`
  mutation($bookId: Int!, $amount: Int!, $message: String) {
    newBookDonation(bookId: $bookId, amount: $amount, message: $message) {
      id
      paymentRequestSecret
    }
  }
`

export const setupStripeMutation = gql`
  mutation($stripeCode: String!) {
    setupStripe(stripeCode: $stripeCode) {
      id
    }
  }
`
