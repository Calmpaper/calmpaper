import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { Link } from 'react-router-dom'

const ReadingList = ({ books, close }) => {
  return (
    <div
      className="sidebar-box sidebar-catalog btn-br"
      style={{ position: 'absolute', top: 72, padding: '16px 24px' }}
    >
      {books.map((book) => (
        <Link
          to={`/books/${book.id}/${
            book.chapters[0] ? book.chapters[0].id : ''
          }`}
          key={book.id}
          onClick={close}
        >
          <div
            className="catalog-img"
            style={{
              backgroundImage: `url('${book.image}')`,
              width: 48,
              height: 64,
            }}
          />

          <div className="catalog-info">
            <h3 className="catalog-title">{book.name}</h3>
            <p className="catalog-author" />
            <div className="progress">
              <div className="progress__line">
                {/* TODO: chapters progress */}
                <span className="progress__stat" style={{ width: '0%' }} />
              </div>
              <div className="progress__num">0%</div>
            </div>
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
        href="http://dev08.morozovoleg.com/home.html"
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
