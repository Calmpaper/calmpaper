import React from 'react'
import { Link } from 'react-router-dom'
import { getUserSlug } from 'helpers'

import BookCover from 'components/atoms/book-cover'
import Rating from 'components/atoms/rating'

const Book = ({ book }) => {
  return (
    <div className="col">
      <Link to={`/${getUserSlug(book.author)}/${book.slug}`}>
        <BookCover book={book} isCatalog />
        <h3 className="catalog-title">{book.name}</h3>
        {book.author && (
          <p className="catalog-author" style={{ marginBottom: 8 }}>
            {book.author.username || book.author.fullname}
          </p>
        )}
        <Rating ratings={book.rating} />
      </Link>
    </div>
  )
}

export default Book
