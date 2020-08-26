import React, { useContext } from 'react'
import { UserContext } from 'context'
import { Link } from 'react-router-dom'

import Notifications from 'components/Notifications'
import Logo from './Logo'
import Read from './Read'
import Create from './Create'

const User = ({ user }) => (
  <Link
    to={`/users/${user.username ? `@${user.username}` : user.id}`}
    className="btn-login"
    style={{
      width: 'auto',
      padding: '0 6px',
      userSelect: 'none',
      fontWeight: 500,
    }}
  >
    <img
      width="24"
      height="24"
      alt="Avatar"
      src={user.avatar}
      style={{ borderRadius: '100%', marginRight: 6 }}
    />
    {user.username || user.givenname}
  </Link>
)

const LoginBtn = () => (
  <li className="header-nav__item" style={{ position: 'relative' }}>
    <a
      className="header-nav__link"
      href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
    >
      Log In
    </a>
  </li>
)

export default ({ home }) => {
  const { user } = useContext(UserContext)

  return (
    <>
      <div className="row">
        <Logo user={user} />
        <div className="col">
          <nav className="header-nav">
            <ul className="header-nav__list">
              {user && (
                <li className="header-nav__item">
                  <Read />
                </li>
              )}
              {user && (
                <li className="header-nav__item">
                  <Create />
                </li>
              )}
              {user && (
                <li
                  className="header-nav__item"
                  style={{ position: 'relative' }}
                >
                  <Notifications />
                </li>
              )}
              {!user && <LoginBtn />}
            </ul>
          </nav>
          {!user ? (
            <li className="header-nav__item" style={{ marginRight: 0 }}>
              <a
                href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
                className="btn-login"
              >
                Sign Up
              </a>
            </li>
          ) : (
            <User user={user} />
          )}
        </div>
      </div>
    </>
  )
}
