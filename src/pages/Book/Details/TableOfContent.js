import React from 'react'
import moment from 'moment'
import { getUserSlug } from 'helpers'
import { Link } from 'react-router-dom'

export default ({ book }) => (
  <div className="row row04">
    <h4 className="title size04">
      Table of contents <span className="count">{book.chapters.length}</span>
    </h4>
    <div className="table">
      <ul>
        {book.chapters.map((chapter, index) => (
          <li>
            <Link to={`/${getUserSlug(book.author)}/${book.slug}/${index + 1}`}>
              <span className="table-title">{`${chapter.title}`}</span>
              <span className="table-time">
                {moment(chapter.createdAt).fromNow()}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
