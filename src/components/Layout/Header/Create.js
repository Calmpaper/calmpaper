import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'

const AddBook = () => {
  return (
    <Link to="/new-book" className="header-nav__link">
      Create
    </Link>
  )
}

const AddChapter = ({ bookId }) => {
  return (
    <Link to={`/books/${bookId}/new-chapter`} className="header-nav__link">
      Create
    </Link>
  )
}

export default () => {
  const bookMatch = useRouteMatch('/books/:book')
  const bookId = bookMatch && bookMatch.params.book

  return bookId ? <AddChapter bookId={bookId} /> : <AddBook />
}
