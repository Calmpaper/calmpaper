import gql from 'graphql-tag'

export const createChapterMutation = gql`
  mutation(
    $title: String!
    $content: String!
    $bookId: Int
    $bookSlug: String
    $userId: Int!
  ) {
    createOneChapter(
      data: {
        title: $title
        content: $content
        author: { connect: { id: $userId } }
        book: { connect: { id: $bookId, slug: $bookSlug } }
      }
    ) {
      id
      title
      content
      book {
        id
        slug
        chapters {
          id
        }
      }
    }
  }
`

export const updateChapterMutation = gql`
  mutation($title: String!, $content: String!, $chapterId: Int!) {
    updateOneChapter(
      where: { id: $chapterId }
      data: { title: $title, content: $content }
    ) {
      id
      title
      content
      book {
        id
        slug
        chapters {
          id
        }
      }
    }
  }
`

export const incrementChapterViewsMutation = gql`
  mutation($chapterId: Int!) {
    incrementChapterViews(chapterId: $chapterId) {
      id
      slug
      title
      views
    }
  }
`

export const deleteChapterMutation = gql`
  mutation($id: Int!) {
    deleteOneChapter(where: { id: $id }) {
      id
    }
  }
`
