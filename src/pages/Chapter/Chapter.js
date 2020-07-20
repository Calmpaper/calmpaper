import React, { useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import {
  getChapterByBookQuery,
  incrementChapterViewsMutation,
  sendChapterCommentMutation,
} from 'api'

import Loader from 'components/Loader'
import Header from 'components/Layout/Header'
import Footer from 'atomic/molecules/footer'
import Comments from 'components/Comments'

import ChapterNavigation from 'atomic/molecules/chapter_navigation'
import Breadcrumbs from './Breadcrumbs'
import Book from './Book'
import Content from './Content'
import Ratings from './Ratings'
import Author from './Author'
import Actions from './Actions'

export default () => {
  const { user } = useContext(UserContext)
  const { book: bookId, chapter: chapterPage } = useParams()

  const [{ data: { chapterByBook = [] } = {}, fetching, error }] = useQuery({
    query: getChapterByBookQuery,
    variables: {
      bookId: parseInt(bookId),
      skip: parseInt(chapterPage) - 1,
    },
  })
  const chapter = chapterByBook[0]

  const [, sendChapterComment] = useMutation(sendChapterCommentMutation)
  const [, incrementChapterViews] = useMutation(incrementChapterViewsMutation)

  // TODO: increment chapter view
  useEffect(() => {
    // incrementChapterViews({
    //   chapterId: chapter.id,
    // })
  }, [])

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  const sendComment = (body) => {
    sendChapterComment({
      userId: parseInt(user.id),
      body,
      chapterId: chapter.id,
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

        <ChapterNavigation chapter={chapter} />

        <Comments comments={chapter.comments} onSubmit={sendComment} />
      </div>
      <Footer centered />
    </>
  )
}
