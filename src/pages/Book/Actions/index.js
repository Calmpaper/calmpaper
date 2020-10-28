import React, { useState } from 'react'
import MoreMenu from './More'

export default ({ bookId, book, hideEdit }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <li className="header-nav__item">
      <div
        className={`dropdown header-notification-edit ${
          showDropdown ? 'in' : ''
        }`}
      >
        <button
          className="dropdown-btn"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <svg className="icon icon-dots">
            <use xlinkHref="#icon-dots" />
          </svg>
        </button>
        <MoreMenu
          hide={() => setShowDropdown(false)}
          bookId={bookId}
          book={book}
          hideEdit={hideEdit}
        />
      </div>
    </li>
  )
}
