/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { Link, useHistory } from 'react-router-dom'
import { getUserSlug } from 'helpers'
import Flex from 'components/atoms/flex'

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
            onClick={() => push(`/${getUserSlug(user)}`)}
          >
            <Flex row style={{ cursor: 'pointer' }}>
              <div
                className="header-notification-user__avatar"
                style={{
                  background: `url("${user.avatar}")`,
                  backgroundSize: 'cover',
                  // backgroundSize: 'contain',
                  cursor: 'pointer',
                }}
              />
              <div className="header-notification-user__info">
                <div className="header-notification-user__name">
                  {user.fullname}
                </div>
                <div className="header-notification-user__username">
                  {getUserSlug(user)}
                </div>
              </div>
            </Flex>
          </div>
          <div className="header-notification-user__body">
            <ul className="header-notification-user__list">
              <li>
                <Link to="/new-book">New book</Link>
              </li>
              <li>
                <Link to={`/${getUserSlug(user)}`}>Profile</Link>
              </li>
              <li>
                <Link to={'/dashboard'}>Dashboard</Link>
              </li>
            </ul>
          </div>
          <div className="header-notification-user__footer">
            <a href onClick={logout} style={{ cursor: 'pointer' }}>
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
              </Link>
            </li>
            <li className="header-nav__item">
              <Link to="/new-book" className="header-nav__link">
                Create
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
