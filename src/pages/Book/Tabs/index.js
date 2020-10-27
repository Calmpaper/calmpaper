import React from 'react'
import { Link } from 'react-router-dom'
import { getUserSlug } from 'helpers'

import Details from '../Details'
import Reviews from '../Reviews'

export default ({ book, tab, reexecuteQuery }) => {
  return (
    <div className="about-book-info">
      <div className="about-book-tabs">
        <Link
          to={`/${getUserSlug(book.author)}/${book.slug}`}
          className={tab === 'details' ? 'active' : ''}
        >
          Details
        </Link>
       {/*  <Link
          to={`/${getUserSlug(book.author)}/${book.slug}/reviews`}
          className={tab === 'reviews' ? 'active' : ''}
        >
          Reviews
        </Link> */}
      </div>

      {tab === 'details' && <Details book={book} />}
      {tab === 'reviews' && (
        <Reviews
          book={book}
          reviews={book.reviews}
          reexecuteQuery={reexecuteQuery}
        />
      )}
    </div>
  )
}
