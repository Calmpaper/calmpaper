import React from 'react'
import { Link } from 'react-router-dom'
import Rating from 'components/Rating'

const Book = ({ book = {} }) => {
  return (
    <div className="col">
      <Link to={`/books/${book.id}`}>
        <div
          className="catalog-img"
          style={{ backgroundImage: `url('${book.image}')` }}
        />
        <h3 className="catalog-title">{book.name}</h3>
        {book.author && (
          <p className="catalog-author">{book.author.fullname}</p>
        )}
        {book.reviews.length > 0 && (
          <Rating ratings={book.reviews} readOnly quiet />
        )}
      </Link>
    </div>
  )
}

export default Book
