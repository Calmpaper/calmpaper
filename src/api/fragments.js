import gql from 'graphql-tag'

export const UserFragment = gql`
  fragment User on User {
    id
    fullname
    username
    givenname
    firstname
    avatar
    bio
    isAdmin
  }
`

export const PollFragment = gql`
  fragment Poll on Poll {
    id
    opt1
    opt2
    opt3
    opt4
    totalVotes
    myVote
    expires
  }
`

export const BookFragment = gql`
  fragment Book on Book {
    id
    slug
    name
    image
  }
`

export const ChapterFragment = gql`
  fragment Chapter on Chapter {
    id
    slug
    title
    createdAt
    rating
    poll {
      totalVotes
    }
  }
`

export const LikeFragment = gql`
  fragment Like on Like {
    id
    createdAt
    author {
      ...User
    }
  }
  ${UserFragment}
`

export const CommentFragment = gql`
  fragment Comment on Comment {
    id
    body
    createdAt
    isChild
    author {
      ...User
    }
    likes {
      ...Like
    }
  }
  ${UserFragment}
  ${LikeFragment}
`

export const GenreFragment = gql`
  fragment Genre on Genre {
    id
    label
  }
`

export const TagFragment = gql`
  fragment Tag on Tag {
    id
    label
  }
`

export const ReviewFragment = gql`
  fragment Review on Review {
    id
    stars
    message
  }
`

export const DonationFragment = gql`
  fragment Donation on Donation {
    id
    amount
    currency
    message
    createdAt
    payer {
      ...User
    }
  }
  ${UserFragment}
`
