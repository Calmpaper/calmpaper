import { useContext } from 'react'
import { UserContext } from 'context'

import * as atoms from 'components/atoms'

import read from './read'
import create from './create'
import sign_in from './sign_in'
import sign_up from './sign_up'

const wrapper = ({ children, home }) =>
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

export const header = ({ home = true, withLine = false }) => {
  const { user } = useContext(UserContext)

  return (
    <components.wrapper home={home}>
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
                {user && (
                  <li className="header-nav__item">
                    <components.read />
                    <Read />
                  </li>
                )}
                {user && (
                  <li className="header-nav__item">
                    <components.create />
                    <Create />
                  </li>
                )}
                {user && (
                  <li
                    className="header-nav__item"
                    style={{ position: 'relative' }}
                  >
                    <components.notifications />
                  </li>
                )}
                {!user && <components.sign_in />}
              </ul>
            </nav>
            {!user ? (
              <li className="header-nav__item">
                <components.sign_up />
              </li>
            ) : (
              <User user={user} />
            )}
          </div>
        </div>
      </div>
    </components.wrapper>
  )
}
