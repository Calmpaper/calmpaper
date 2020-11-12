import React from 'react'
import moment from 'moment'
import { getUserSlug } from 'helpers'
import { Link } from 'react-router-dom'

import BookCover from 'components/atoms/book-cover'

const Chapter = ({ chapter }) => {
  const chapterPage =
    chapter.book.chapters.findIndex((c) => c.id === chapter.id) + 1

  var regex = /(<([^>]+)>)/gi

  return (
    <Link
      to={`/${getUserSlug(chapter.author)}/${chapter.book.slug}/${chapterPage}`}
      className="item"
    >
      <BookCover book={chapter.book} isItem hideText />
      <div className="item-info" style={{ width: '100%' }}>
        <div
          className="item-head"
          style={{
            alignItems: 'center',
            marginTop: 0,
          }}
        >
          <h3 className="item-title">
            {chapter.book.name} · <span>{chapter.title}</span>
          </h3>
          <div
            className="item-time"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 0,
              // minWidth: '190px',
              // marginLeft: 8,
              // textAlign: 'end'
            }}
          >
            <p
              style={{
                lineHeight: '17px',
                color: '#57586c',
                fontSize: '14px',
                // fontWeight: '500',
              }}
            >
              {`by `}
              <strong
                style={{
                  lineHeight: '17px',
                  color: '#57586c',
                  fontSize: '14px',
                  marginRight: '8px',
                  // marginLeft: '3px',
                  fontWeight: '500',
                }}
              >{`${
                chapter.author.username || chapter.author.fullname
              }`}</strong>
            </p>
            <img
              src={chapter.author.avatar}
              style={{
                width: 26,
                height: 26,
                borderRadius: 6,
              }}
              alt="Avatar"
            />
          </div>
        </div>
        <p
          className="item-time"
          style={{
            marginTop: '-4px',
            marginBottom: '10px',
          }}
        >
          {moment(chapter.createdAt).fromNow()}
        </p>
        <p className="item-text">{`${chapter.content
          .replace(/&nbsp;/g, '')
          .replace(regex, '')
          .substring(0, 255)}...`}</p>
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
