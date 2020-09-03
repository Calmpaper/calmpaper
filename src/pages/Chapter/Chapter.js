import React, { useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import { Helmet } from 'react-helmet'
import {
  getChapterByBookQuery,
  incrementChapterViewsMutation,
  sendChapterCommentMutation,
} from 'api'

import Loader from 'components/Loader'
import Header from 'components/Layout/Header'
import Footer from 'components/molecules/footer'
import Comments from 'components/Comments'

import ChapterNavigation from 'components/molecules/chapter_navigation'
import Breadcrumbs from './Breadcrumbs'
import Book from './Book'
import Content from './Content'
import Ratings from './Ratings'
import Author from './Author'
import Actions from './Actions'

export default () => {
  const { user } = useContext(UserContext)
  const { book: bookId, chapter: chapterPage } = useParams()

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

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {`${chapter.title}. ${chapter.book.name} by ${
            chapter.author.username || chapter.author.fullname
          } at Calmpaper`}{' '}
        </title>

        <meta
          property="og:title"
          content={`${chapter.title}. ${chapter.book.name} by ${
            chapter.author.username || chapter.author.fullname
          } at Calmpaper`}
        />
        <meta property="og:description" content={chapter.content} />
        <meta property="og:image" content={chapter.book.image} />
        <meta
          property="og:url"
          content={`https://calmpaper.org/books/${chapter.book.id}/${chapterPage}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="Calmpaper" />
        <meta name="twitter:image:alt" content={`${chapter.book.name} cover`} />
        <meta name="twitter:site" content="@Calmpaper" />
      </Helmet>
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
