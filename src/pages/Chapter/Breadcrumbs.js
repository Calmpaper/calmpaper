import React from 'react'
import { Link } from 'react-router-dom'

export default ({ chapter }) => (
  <div className="pagination">
    <Link to="/" className="pagination__link">
      Home
    </Link>
    <svg className="icon icon-arrow-right">
      <use xlinkHref="#icon-arrow-right" />
    </svg>
    <Link to={`/books/${chapter.book.id}`} className="pagination__link">
      {chapter.book.name}
    </Link>
    <svg className="icon icon-arrow-right">
      <use xlinkHref="#icon-arrow-right" />
    </svg>
    <span href className="pagination__link active">
      {chapter.title}
    </span>
  </div>
)
