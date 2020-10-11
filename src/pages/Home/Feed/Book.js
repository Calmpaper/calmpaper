import React from 'react'
import { Link } from 'react-router-dom'
import { getUserSlug } from 'helpers'
import BookCover from 'components/atoms/book-cover'
import Rating from 'components/Rating'

const Book = ({ book = {} }) => {
  return (
    <div className="col">
      <Link to={`/${getUserSlug(book.author)}/${book.slug}`}>
        <BookCover book={book} isCatalog />
        <h3 className="catalog-title">{book.name}</h3>
        {book.author && (
          <p className="catalog-author">
            {book.author.username || book.author.fullname}
          </p>
        )}
        {book.reviews.length > 0 && (
          <Rating ratings={book.reviews} readOnly quiet />
        )}
      </Link>
    </div>
  )
}

export default Book
