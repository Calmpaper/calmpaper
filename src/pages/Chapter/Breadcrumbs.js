import React from 'react'
import { Link } from 'react-router-dom'

export default ({ author, chapter }) => (
  <div className="pagination">
    <Link
      to={`/users/${author.username ? `@${author.username}` : author.id}`}
      className="pagination__link"
    >
      {author.username || author.fullname}
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
    <span className="pagination__link active">{chapter.title}</span>
  </div>
)
