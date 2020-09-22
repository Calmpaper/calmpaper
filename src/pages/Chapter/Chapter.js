import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import {
  getChapterByBookQuery,
  incrementChapterViewsMutation,
  sendChapterCommentMutation,
} from 'api'

import Loader from 'components/Loader'
import Header from 'components/Layout/Header'
import Footer from 'components/molecules/footer'
import Comments from 'components/Comments'
import SharePopup from 'components/Popups/SharePopup'

import ChapterNavigation from 'components/molecules/chapter_navigation'
import Meta from './Chapter.meta'
import Breadcrumbs from './Breadcrumbs'
import Book from './Book'
import Content from './Content'
import Ratings from './Ratings'
import Author from './Author'
import Actions from './Actions'

export default () => {
  const { user } = useContext(UserContext)
  const { book: bookId, chapter: chapterPage } = useParams()
  const { location } = useHistory()
  const [showSharePopup, setShowSharePopup] = useState(
    location.state ? location.state.showSharePopup : false,
  )

  const [
    { data: { chapterByBook = [] } = {}, fetching, error },
    reexecuteQuery,
  ] = useQuery({
    query: getChapterByBookQuery,
    variables: {
      bookId: parseInt(bookId),
      skip: parseInt(chapterPage) - 1,
    },
  })
  const chapter = chapterByBook[0]

  useEffect(() => {
    if (chapter && window.analytics) {
      window.analytics.page('chapter', {
        chapterId: chapter.id,
        bookId: chapter.book.id,
        chapterTitle: chapter.title,
        bookName: chapter.book.name,
      })
    }
  }, [chapter, window.analytics])

  const [, sendChapterComment] = useMutation(sendChapterCommentMutation)
  const [, incrementChapterViews] = useMutation(incrementChapterViewsMutation)

  useEffect(() => {
    if (!fetching && chapter) {
      incrementChapterViews({
        chapterId: chapter.id,
      })
    }
  }, [fetching])

  if (fetching && !chapter) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  const sendComment = (body) => {
    sendChapterComment({
      userId: parseInt(user.id),
      body,
      chapterId: chapter.id,
    })
  }
  console.log(location)

  return (
    <>
      <Meta chapter={chapter} chapterPage={chapterPage} />
      {showSharePopup && <SharePopup close={() => setShowSharePopup(false)} />}
      <Header withLine />
      <div className="page-read-book">
        <Breadcrumbs chapter={chapter} author={chapter.author} />
        <div className="read-book-main">
          <Book book={chapter.book} />
          <Ratings chapter={chapter} />
        </div>
        <Content chapter={chapter} />

        <Author author={chapter.author} chapterId={chapter.id} />

        <Actions chapter={chapter} />

        <Comments comments={chapter.comments} onSubmit={sendComment} />
      </div>

      <ChapterNavigation chapter={chapter} reexecuteQuery={reexecuteQuery} />
      <Footer centered />
    </>
  )
}
