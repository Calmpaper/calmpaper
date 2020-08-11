import { useContext } from 'react'
import { UserContext } from 'context'
import { signIn, signOut, useSession } from 'next-auth/client'

import * as atoms from 'components/atoms'

import read from './read'
import create from './create'
import sign_in from './sign_in'
import sign_up from './sign_up'

const User = ({ user }) => (
  <a
    href={`/api/auth/signout`}
    onClick={(e) => {
      e.preventDefault()
      signOut()
    }}
  >
    {user.name}
  </a>
)
// <div onClick={signOut}>{user.name}</div>

const wrapper = ({ children, home, withLine }) =>
  home ? (
    <header>
      <div className="container">{children}</div>
    </header>
  ) : (
    <header className={`header-black ${withLine ? 'header-line' : ''}`}>
      {children}
    </header>
  )

const components = { wrapper, read, create, sign_in, sign_up }

export const header = ({ home = false, withLine = false }) => {
  const [session, loading] = useSession()
  console.log('session')
  console.log(session)

  return (
    <components.wrapper home={home} withLine={withLine}>
      <div className="container">
        <div className="row">
          <atoms.logo />
          <div className="col">
            <nav className="header-nav">
              <ul className="header-nav__list">
                {/*
                <atoms.header_link.read />
                <atoms.header_link.create />
                <atoms.header_link.notifications />
                <atoms.header_link.sign_in />
                <atoms.header_link.sign_up />
                */}
                {session && (
                  <li className="header-nav__item">
                    <components.read />
                  </li>
                )}
                {session && (
                  <li className="header-nav__item">
                    <components.create />
                  </li>
                )}
                {/*session && (
                  <li
                    className="header-nav__item"
                    style={{ position: 'relative' }}
                  >
                    <components.notifications />
                  </li>
                )*/}
                {!session && <components.sign_in />}
              </ul>
            </nav>
            {!session ? (
              <li className="header-nav__item">
                <components.sign_up />
              </li>
            ) : (
              <User user={session.user} />
            )}
          </div>
        </div>
      </div>
    </components.wrapper>
  )
}
