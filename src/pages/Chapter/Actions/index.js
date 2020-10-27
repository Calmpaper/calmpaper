import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import MoreMenu from './More'

export default ({ chapter }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { user } = useContext(UserContext)

  if (!user || (user.id !== chapter.author.id && !user.isAdmin)) return null

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
          bookId={chapter.book.id}
          chapterId={chapter.id}
          chapter={chapter}
          hide={() => setShowDropdown(false)}
          hideEdit={user.isAdmin && user.id !== chapter.author.id}
        />
      </div>
    </li>
  )
}
