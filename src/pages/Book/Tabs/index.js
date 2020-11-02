import React from 'react'
import { Link } from 'react-router-dom'
import { getUserSlug } from 'helpers'

import Details from '../Details'

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
      </div>

      {tab === 'details' && <Details book={book} />}
    </div>
  )
}
