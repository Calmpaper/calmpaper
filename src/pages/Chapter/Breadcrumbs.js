import React from 'react'
import { getUserSlug, getUserDisplayName } from 'helpers'
import { Link } from 'react-router-dom'

export default ({ author, chapter }) => (
  <div className="pagination">
    <div className="row">
      <Link to={`/${getUserSlug(author)}`} className="pagination__link">
        {getUserDisplayName(author)}
      </Link>
      <svg className="icon icon-arrow-right">
        <use xlinkHref="#icon-arrow-right" />
      </svg>
      <Link
        to={`/${getUserSlug(chapter.book.author)}/${chapter.book.slug}`}
        className="pagination__link"
      >
        {chapter.book.name}
      </Link>
      <svg className="icon icon-arrow-right">
        <use xlinkHref="#icon-arrow-right" />
      </svg>
      <span className="pagination__link active">{chapter.title}</span>
    </div>
  </div>
)
