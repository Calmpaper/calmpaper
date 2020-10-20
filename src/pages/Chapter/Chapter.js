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
import Headroom from 'react-headroom'
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
  const { bookSlug, bookId, chapter: chapterPage } = useParams()
  const { location } = useHistory()
  const [showSharePopup, setShowSharePopup] = useState(
    location.state ? location.state.showSharePopup : false,
  )

  const [
    { data: { chapterByBook = [] } = {}, fetching, error },
    reexecuteQuery,
  ] = useQuery({
    query: getChapterByBookQuery,
    variables: bookSlug
      ? {
          bookSlug,
          skip: parseInt(chapterPage) - 1,
        }
      : {
          bookId: parseInt(bookId),
          skip: parseInt(chapterPage) - 1,
        },
  })
  const chapter = chapterByBook[0]

  useEffect(() => {
    if (chapter) {
      if (window.location.hash === '#comments') {
        document.getElementById('comments-input').scrollIntoView()
        document.getElementById('comments-input').focus()
      }
    }
  }, [chapter])

  useEffect(() => {
    if (chapter && chapter.id) {
      window.prerenderReady = true
    }
  }, [chapter])

  useEffect(() => {
    if (chapter && window.analytics) {
      window.analytics.page('chapter', {
        chapterId: chapter.id,
        bookId: chapter.book.id,
        bookSlug: chapter.book.slug,
        chapterTitle: chapter.title,
        bookName: chapter.book.name,
      })
    }
  }, [chapter, window.analytics])

  const [, sendChapterComment] = useMutation(sendChapterCommentMutation)
  const [, incrementChapterViews] = useMutation(incrementChapterViewsMutation)

  useEffect(() => {
    if (!fetching && chapter) {
      if (
        window &&
        window.localStorage &&
        !window.localStorage.getItem(`${window.location.href}-visited`)
      ) {
        incrementChapterViews({
          chapterId: chapter.id,
        })
        window.localStorage.setItem(`${window.location.href}-visited`, true)
      }
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

  return (
    <div className="page-read-bookk">
      <Meta chapter={chapter} chapterPage={chapterPage} />
      {showSharePopup && <SharePopup close={() => setShowSharePopup(false)} />}
      <Headroom>
        <Header withLine />
      </Headroom>
      <div className="page-read-book">
        <Breadcrumbs chapter={chapter} author={chapter.author} />

        <Book chapter={chapter} />
        <Content chapter={chapter} />

        <Author author={chapter.author} chapterId={chapter.id} />

        <Actions chapter={chapter} />

        <Comments comments={chapter.comments} onSubmit={sendComment} />
      </div>

      <ChapterNavigation chapter={chapter} reexecuteQuery={reexecuteQuery} />
      {/*
      <Footer centered />
*/}
    </div>
  )
}
