/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { Link, useHistory } from 'react-router-dom'
import { getUserSlug } from 'helpers'
import Flex from 'components/atoms/flex'
import CryptoJS from 'crypto-js'
import SharePopup from 'components/Popups/SharePopup'

const Share = ({ setShowInvitePopup, user }) => {
  var rawStr = `user${user.id}`
  var wordArray = CryptoJS.enc.Utf8.parse(rawStr)
  var base64 = CryptoJS.enc.Base64.stringify(wordArray)

  return (
    <SharePopup
      close={() => setShowInvitePopup(false)}
      url={`https://calmpaper.org/invite?from=${base64}`}
      title="Invite your friends to write"
      invitedCount={user.invited.length || null}
      labelText="Send link (You will autofollow each other)"
    />
  )
}

export default () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showInvitePopup, setShowInvitePopup] = useState(false)
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
        <div
          className="dropdown-box notification-box notification-header-box"
          style={{ padding: 0 }}
        >
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
                <Link to={`/${getUserSlug(user)}`}>Profile</Link>
              </li>
              <li>
                <Link to="/publish">Publish</Link>
              </li>
              <li>
                <a onClick={() => setShowInvitePopup(true)}>Invite people</a>
              </li>
              <li>
                <Link to={'/followed'}>Followed books</Link>
              </li>
              <li>
                <Link to={`/feed`}>Feed</Link>
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
              <li className="header-nav__item">
                <Link to="/publish" className="header-nav__link">
                  Add book
                </Link>
              </li>
              <li className="header-nav__item">
                <a
                  onClick={() => setShowInvitePopup(true)}
                  className="header-nav__link"
                >
                  Invite
                </a>
              </li>
              <li className="header-nav__item">
                <Link to={'/feed'} className="header-nav__link">
                  Following
                </Link>
              </li>
            </li>
          </ul>
        </nav>
      </div>

      {showInvitePopup && (
        <Share setShowInvitePopup={setShowInvitePopup} user={user} />
      )}
    </>
  )
}
