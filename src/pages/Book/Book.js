import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import {
  getBookQuery,
  incrementBookViewsMutation,
  sendBookCommentMutation,
} from 'api'

import Loader from 'components/Loader'
import Header from 'components/Layout/Header'
import Comments from 'components/Comments'
import DonationModal from 'components/DonationModal'
import BookPublishedOverlay from 'components/BookPublishedOverlay'

import Meta from './Book.meta'
import About from './About'
import Tabs from './Tabs'
import Author from './Author'
import Actions from './Actions'

export default ({ tab, update }) => {
  const [showDonationModal, setShowDonationModal] = useState(false)
  const { bookSlug, bookId } = useParams()
  const { user } = useContext(UserContext)
  const { location } = useHistory()
  const [showBookPublishedOverlay, setShowBookPublishedOverlay] = useState(
    location.state ? location.state.showBookPublishedOverlay : false,
  )

  const [{ data: { book } = {}, fetching, error }, reexecuteQuery] = useQuery({
    pause: !(bookSlug || bookId),
    query: getBookQuery,
    variables: bookSlug ? { slug: bookSlug } : { id: parseInt(bookId) },
  })

  useEffect(() => {
    if (book && book.id) {
      window.prerenderReady = true
    }
  }, [book])

  useEffect(() => {
    if (book && window.analytics) {
      window.analytics.page('book', {
        bookId: book.id,
        bookSlug: book.slug,
        bookName: book.name,
      })
    }
  }, [book, window.analytics])

  const [, sendBookComment] = useMutation(sendBookCommentMutation)
  const [, incrementBookViews] = useMutation(incrementBookViewsMutation)

  useEffect(() => {
    if (
      window &&
      window.localStorage &&
      !window.localStorage.getItem(`${window.location.href}-visited`)
    ) {
      incrementBookViews(bookSlug ? { bookSlug } : { bookId: parseInt(bookId) })
      window.localStorage.setItem(`${window.location.href}-visited`, true)
    }
  }, [bookId, incrementBookViews])

  const sendComment = (body) => {
    sendBookComment({
      bookId: parseInt(book.id),
      userId: parseInt(user.id),
      body,
    })
  }

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <>
      <Meta book={book} />
      <Header />
      <div className="page-about-book">
        {showBookPublishedOverlay && (
          <BookPublishedOverlay
            close={() => setShowBookPublishedOverlay(false)}
          />
        )}
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

              {book.author.stripeId && (
                <button
                  onClick={() => setShowDonationModal(true)}
                  className="btn btn-color"
                  style={{ marginTop: 16 }}
                >
                  Donate
                </button>
              )}
              <div style={{ marginTop: 48 }}>
                <Comments comments={book.comments} onSubmit={sendComment} />
              </div>
              {/*
              <Footer />
*/}
            </div>
          </div>
          {book.author && <Author author={book.author} bookId={book.id} />}
        </div>
      </div>
      {/*
      <Footer tel />
*/}
      {showDonationModal && (
        <DonationModal
          bookId={book.id}
          show={showDonationModal}
          close={() => setShowDonationModal(false)}
          author={book.author}
        />
      )}
    </>
  )
}
