import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { Link, useHistory } from 'react-router-dom'

export default () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { push } = useHistory()
  const { logout, user } = useContext(UserContext)

  return (
    <>
      <div
        className={`dropdown header-notification  header-notification-user ${
          showDropdown ? 'in' : ''
        }`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <button className="dropdown-btn btn-login btn-login-active">
          <span
            className="login-avatar"
            style={{ backgroundImage: `url("${user.avatar}")` }}
          />
          {user.username || user.givenname}
        </button>
        <div className="dropdown-box notification-box notification-header-box">
          <div
            className="header-notification-user__head"
            onClick={() =>
              push(`/users/${user.username ? `@${user.username}` : user.id}`)
            }
          >
            <div
              className="header-notification-user__avatar"
              style={{
                background: `url("${user.avatar}")`,
                backgroundSize: 'cover',
              }}
            />
            <div className="header-notification-user__info">
              <div className="header-notification-user__name">
                {user.fullname}
              </div>
              <div className="header-notification-user__username">
                {user.username ? `@${user.username}` : `@user${user.id}`}
              </div>
            </div>
          </div>
          <div className="header-notification-user__body">
            <ul className="header-notification-user__list">
              <li>
                <Link to="/new-book">New story</Link>
              </li>
              <li>
                <Link
                  to={`/users/${user.username ? `@${user.username}` : user.id}`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to={`/users/${user.username ? `@${user.username}` : user.id}`}
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link to={`/help`}>Help</Link>
              </li>
            </ul>
          </div>
          <div className="header-notification-user__footer">
            <a href onClick={logout}>
              Sign out
            </a>
          </div>
        </div>
      </div>
      {/* Nav Tel */}
      <a
        id="nav-toggle"
        onClick={() => setShowMenu(!showMenu)}
        className={showMenu ? 'active' : ''}
      >
        <span />
      </a>
      <div className={`nav-box-mobile ${showMenu ? 'in' : ''}`}>
        <nav className="header-nav">
          <ul className="header-nav__list">
            <li className="header-nav__item">
              <Link to="/" className="header-nav__link">
                Read
                {/*
                <span className="header-nav__link-icon">
                  <svg className="icon icon-arrow-down">
                    <use xlinkHref="#icon-arrow-down" />
                  </svg>
                </span>
                */}
              </Link>
            </li>
            <li className="header-nav__item">
              <Link to="/new-book" className="header-nav__link">
                Create
              </Link>
            </li>
            {/*
            <li className="header-nav__item">
              <a href className="header-nav__link">
                Forum
              </a>
            </li>
            <li className="header-nav__item">
              <a href className="header-nav__link">
                Search
              </a>
            </li>
*/}
            {/*
             */}
          </ul>
        </nav>
      </div>
    </>
  )
}

// const User = ({ user }) => (
// )

// export default User
