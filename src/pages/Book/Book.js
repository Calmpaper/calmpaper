import React, { useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import {
  getBookQuery,
  incrementBookViewsMutation,
  sendBookCommentMutation,
} from 'api'

import Loader from 'components/Loader'
import Header from 'components/Layout/Header'
import Footer from 'atomic/molecules/footer'
import Comments from 'components/Comments'

import About from './About'
import Tabs from './Tabs'
import Author from './Author'
import Actions from './Actions'

export default ({ tab, update }) => {
  const { book: bookId } = useParams()
  const { user } = useContext(UserContext)

  const [{ data: { book } = {}, fetching, error }, reexecuteQuery] = useQuery({
    pause: !bookId,
    query: getBookQuery,
    variables: {
      id: parseInt(bookId),
    },
  })

  useEffect(() => {
    if (book) {
      window.analytics.track('visit-book', {
        bookId: book.id,
        bookName: book.name,
      })
    }
  }, [book])

  const [, sendBookComment] = useMutation(sendBookCommentMutation)
  const [, incrementBookViews] = useMutation(incrementBookViewsMutation)

  useEffect(() => {
    incrementBookViews({ bookId: parseInt(bookId) })
  }, [bookId, incrementBookViews])

  const sendComment = (body) => {
    sendBookComment({
      bookId: parseInt(bookId),
      userId: parseInt(user.id),
      body,
    })
  }

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <>
      <Header />
      <div className="page-about-book">
        <div className="two-col">
          <div className="col-content">
            <div className="items">
              <About book={book} />
              <Tabs book={book} tab={tab} reexecuteQuery={reexecuteQuery} />
              {user && user.id === book.author.id && (
                <div style={{ marginTop: 16 }}>
                  <Actions bookId={book.id} book={book} />
                </div>
              )}
              <div style={{ marginTop: 48 }}>
                <Comments comments={book.comments} onSubmit={sendComment} />
              </div>
              <Footer />
            </div>
          </div>
          {book.author && <Author author={book.author} />}
        </div>
      </div>
    </>
  )
}
