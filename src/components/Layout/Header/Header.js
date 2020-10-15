import React, { useContext } from 'react'
import { UserContext } from 'context'

import Notifications from 'components/Notifications'
import Logo from './Logo'
import Read from './Read'
import Create from './Create'
import LoginBtn from './LoginBtn'
import SignupBtn from './SignupBtn'
import User from './User'

export default ({ home }) => {
  const { user } = useContext(UserContext)

  return (
    <>
      <div className="row">
        <Logo user={user} />
        <div className="col">
          <nav className="header-nav">
            <ul className="header-nav__list">
              {/* user && (
                <li className="header-nav__item">
                  <Read />
                </li>
                  )*/}
              {user && <Create />}
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
          {!user ? <SignupBtn /> : <User user={user} />}
        </div>
      </div>
    </>
  )
}
