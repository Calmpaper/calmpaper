import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import BookCover from 'components/atoms/book-cover'
import { Link } from 'react-router-dom'

const ReadingList = ({ books, close }) => {
  return (
    <div
      className="sidebar-box sidebar-catalog btn-br dropdown-box"
      style={{
        position: 'absolute',
        top: 72,
        padding: '16px 24px',
        visibility: 'visible',
        right: 40,
        opacity: 1,
        marginLeft: -20,
        cursor: 'pointer',
      }}
    >
      {books.map((book) => (
        <Link to={`/books/${book.id}`} key={book.id} onClick={close}>
          <BookCover
            book={book}
            isCatalog
            style={{
              width: 48,
              height: 64,
            }}
          />
          <div className="catalog-info">
            <h3 className="catalog-title">{book.name}</h3>
            <p className="catalog-author">
              {book.author.username || book.author.fullname}
            </p>
            {/*
            <div className="progress">
              <div className="progress__line">
                <span className="progress__stat" style={{ width: '0%' }} />
              </div>
              <div className="progress__num">0%</div>
            </div>
            */}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default () => {
  const { user } = useContext(UserContext)
  const [showDropdown, setShowDropdown] = useState(false)

  return user && user.favoriteBooks.length > 0 ? (
    <>
      <span
        className="header-nav__link"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Read
        <span className="header-nav__link-icon">
          <svg className="icon icon-arrow-down">
            <use xlinkHref="#icon-arrow-down" />
          </svg>
        </span>
      </span>
      {showDropdown && (
        <ReadingList
          books={user.favoriteBooks}
          close={() => setShowDropdown(false)}
        />
      )}
    </>
  ) : null
}
