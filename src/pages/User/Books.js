import React from 'react'
import { useHistory } from 'react-router-dom'
import { getUserSlug } from 'helpers'
import BookCover from 'components/atoms/book-cover'
import Rating from 'components/atoms/rating'

const Book = ({ book }) => {
  const { push } = useHistory()

  return (
    <div
      className="col"
      onClick={() => push(`/${getUserSlug(book.author)}/${book.slug}`)}
    >
      <a href>
        <BookCover book={book} isCatalog />
        <h3 className="catalog-title">{book.name}</h3>
        <p className="catalog-author" style={{ marginBottom: 8 }}>
          {book.author.fullname}
        </p>
        <Rating rating={book.rating} />
      </a>
    </div>
  )
}

export default ({ books }) => {
  return (
    <div className="catalog">
      <div className="container">
        <div className="row">
          {books.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
