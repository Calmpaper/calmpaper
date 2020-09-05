import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import { Helmet } from 'react-helmet'
import {
  getBookQuery,
  incrementBookViewsMutation,
  sendBookCommentMutation,
} from 'api'

import Loader from 'components/Loader'
import Header from 'components/Layout/Header'
import Footer from 'components/molecules/footer'
import Comments from 'components/Comments'
import DonationModal from 'components/DonationModal'
import BookPublishedOverlay from 'components/BookPublishedOverlay'

import About from './About'
import Tabs from './Tabs'
import Author from './Author'
import Actions from './Actions'

export default ({ tab, update }) => {
  const [showDonationModal, setShowDonationModal] = useState(false)
  const { book: bookId } = useParams()
  const { user } = useContext(UserContext)
  const { location } = useHistory()
  const [showBookPublishedOverlay, setShowBookPublishedOverlay] = useState(
    location.state ? location.state.showBookPublishedOverlay : false,
  )

  const [{ data: { book } = {}, fetching, error }, reexecuteQuery] = useQuery({
    pause: !bookId,
    query: getBookQuery,
    variables: {
      id: parseInt(bookId),
    },
  })

  useEffect(() => {
    if (book && window.analytics) {
      window.analytics.page('book', {
        bookId: book.id,
        bookName: book.name,
      })
    }
  }, [book, window.analytics])

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

  const meta = {
    title: `${book.name} by ${
      book.author.username || book.author.fullname
    } at Calmpaper`,
    description: book.description,
    image: book.image,
    url: `https://calmpaper.org/books/${book.id}`,
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title}</title>

        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="Calmpaper" />
        <meta name="twitter:image:alt" content={`${book.name} cover`} />
        <meta name="twitter:site" content="@Calmpaper" />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content={meta.title} />
        <meta itemProp="description" content={meta.description} />
        <meta itemProp="image" content={meta.image} />
        {/* Facebook Meta Tags */}
        <meta property="og:url" content={meta.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Helmet>

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
              <Footer />
            </div>
          </div>
          {book.author && <Author author={book.author} bookId={bookId} />}
        </div>
      </div>
      <Footer tel />
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
