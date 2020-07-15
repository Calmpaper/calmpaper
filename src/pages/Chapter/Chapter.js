import React, { useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import {
  getChapterQuery,
  incrementChapterViewsMutation,
  sendChapterCommentMutation,
} from 'api'

import Loader from 'components/Loader'
import Header from 'components/Layout/Header'
import Footer from 'components/Layout/Footer'
import Comments from 'components/Comments'

import Breadcrumbs from './Breadcrumbs'
import Book from './Book'
import Content from './Content'
import Ratings from './Ratings'
import Author from './Author'
import Actions from './Actions'

export default () => {
  const { user } = useContext(UserContext)
  const { book: bookId, chapter: chapterId } = useParams()

  // const [{ data: { chapterByBook = [] } = {}, fetching, error }] = useQuery({
  //   query: getChapterByBookQuery,
  //   variables: {
  //     bookId: parseInt(bookId),
  //     skip: parseInt(chapterId) - 1,
  //   },
  // })
  // const chapter = chapterByBook[0]
  const [{ data: { chapter = {} } = {}, fetching, error }] = useQuery({
    query: getChapterQuery,
    variables: {
      id: parseInt(chapterId),
    },
  })

  // eslint-disable-next-line no-unused-vars
  const [__, sendChapterComment] = useMutation(sendChapterCommentMutation)

  // eslint-disable-next-line no-unused-vars
  const [_, incrementChapterViews] = useMutation(incrementChapterViewsMutation)

  useEffect(() => {
    incrementChapterViews({
      chapterId: parseInt(chapterId),
    })
  }, [chapterId, incrementChapterViews])

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  const sendComment = (body) => {
    sendChapterComment({
      userId: parseInt(user.id),
      body,
      chapterId: parseInt(chapterId),
    })
  }

  return (
    <>
      <Header withLine />
      <div className="page-read-book">
        <Breadcrumbs chapter={chapter} />
        <div className="read-book-main">
          <Book book={chapter.book} />
          <Ratings chapter={chapter} />
        </div>
        <Content chapter={chapter} />

        <Author author={chapter.author} />

        <Actions chapter={chapter} />

        <Comments comments={chapter.comments} onSubmit={sendComment} />
      </div>
      <Footer centered />
    </>
  )
}
