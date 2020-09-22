import React, { useState } from 'react'
import MoreMenu from './More'

export default ({ bookId, book }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="row">
      <button
        className="comment-context-menu__button"
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          color: '#4375fc',
          opacity: 1,
        }}
      >
        <svg
          viewBox="0 0 18 18"
          className="comment-context-menu__icon"
          style={{ width: 24, height: 24 }}
        >
          <use xlinkHref="#dots-s--inline" />
        </svg>
      </button>
      {showDropdown && (
        <MoreMenu
          hide={() => setShowDropdown(false)}
          bookId={bookId}
          book={book}
        />
      )}
    </div>
  )
}
