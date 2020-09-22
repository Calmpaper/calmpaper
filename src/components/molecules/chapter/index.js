import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Chapter = ({ chapter }) => {
  const chapterPage =
    chapter.book.chapters.findIndex((c) => c.id === chapter.id) + 1

  var regex = /(<([^>]+)>)/gi

  return (
    <Link to={`/books/${chapter.book.id}/${chapterPage}`} className="item">
      <div
        className="item-img"
        style={{
          backgroundImage: `url("${
            chapter.book.image || '/img/placeholder.jpg'
          }")`,
        }}
      />
      <div className="item-info" style={{ width: '100%' }}>
        <div className="item-head">
          <h3 className="item-title">
            {chapter.book.name} · <span>{chapter.title}</span>
          </h3>
          <div
            className="item-time"
            style={
              {
                // minWidth: '190px',
                // marginLeft: 8,
                // textAlign: 'end'
              }
            }
          >{`${chapter.author.username || chapter.author.fullname}, ${moment(
            chapter.createdAt,
          ).fromNow()}`}</div>
        </div>
        <p className="item-text">{`${chapter.content
          .replace(regex, '')
          .substring(0, 155)}...`}</p>
        <ul className="item-category">
          {chapter.book.genres.map((genre) => (
            <li key={genre.id}>
              <a href>{genre.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

export default Chapter
