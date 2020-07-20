import gql from 'graphql-tag'

export const createChapterMutation = gql`
  mutation($title: String!, $content: String!, $bookId: Int!, $userId: Int!) {
    createChapter(
      title: $title
      content: $content
      userId: $userId
      bookId: $bookId
    ) {
      id
      title
      content
      book {
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
