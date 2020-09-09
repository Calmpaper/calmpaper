import { useState, useContext } from 'react'
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
  const [showDropdown, setShowDropdown] = useState(false)
  console.log('session')
  console.log(session)

  return (
    <header className="header header-black header-line">
      <div className="row">
        <div className="col">
          <div className="header-logo">
            <a href className="logo">
              <img src="/img/logo-black.svg" alt="logo" />
            </a>
          </div>
        </div>
        <div className="col">
          <nav className="header-nav">
            <ul className="header-nav__list">
              <li className="header-nav__item">
                <a href className="header-nav__link">
                  Read
                  <span className="header-nav__link-icon">
                    <svg className="icon icon-arrow-down">
                      <use xlinkHref="#icon-arrow-down" />
                    </svg>
                  </span>
                </a>
              </li>
              <li className="header-nav__item">
                <a href className="header-nav__link">
                  Create
                </a>
              </li>
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
            </ul>
          </nav>
          {/* Notification */}
          <div className="dropdown header-notification">
            <button className="dropdown-btn notification-btn">
              <svg className="icon icon-bell">
                <use xlinkHref="#icon-bell" />
              </svg>
              <span className="notification-count">25</span>
            </button>
            <div className="dropdown-box notification-box notification-header-box">
              <div className="dropdown-box__title">Notifications</div>
              <div className="dropdown-box__body custom-scroll">
                {/* user-box */}
                <div className="user-box">
                  <div
                    className="user-box__avatar"
                    style={{ backgroundImage: 'url(img/avatar01.jpg)' }}
                  />
                  <div className="user-box__info">
                    <div className="user-box__name">Ryan Putnam</div>
                    <div className="user-box__inline">
                      <div className="user-box__comment">Rated your book</div>
                      <div className="user-box__date">1 day ago</div>
                    </div>
                  </div>
                </div>
                {/* user-box */}
                <div className="user-box">
                  <div
                    className="user-box__avatar"
                    style={{ backgroundImage: 'url(img/avatar02.jpg)' }}
                  />
                  <div className="user-box__info">
                    <div className="user-box__name">Riccardo Carlet</div>
                    <div className="user-box__comment">
                      Wrote a comment for your book
                    </div>
                    <div className="user-box__inline">
                      <div className="user-box__link">The Glass Hotel</div>
                      <div className="user-box__date">2 days ago</div>
                    </div>
                  </div>
                </div>
                {/* user-box */}
                <div className="user-box">
                  <div
                    className="user-box__avatar"
                    style={{ backgroundImage: 'url(img/avatar03.jpg)' }}
                  />
                  <div className="user-box__info">
                    <div className="user-box__name">Jeremy Goldberg</div>
                    <div className="user-box__inline">
                      <div className="user-box__comment">Rated your book</div>
                      <div className="user-box__date">2 days ago</div>
                    </div>
                  </div>
                </div>
                {/* user-box */}
                <div className="user-box">
                  <div
                    className="user-box__avatar"
                    style={{ backgroundImage: 'url(img/avatar04.jpg)' }}
                  />
                  <div className="user-box__info">
                    <div className="user-box__name">Scott Boms</div>
                    <div className="user-box__inline">
                      <div className="user-box__comment">
                        Wrote a comment for your book
                      </div>
                      <div className="user-box__inline">
                        <div className="user-box__link">
                          American Dirt: A Novel
                        </div>
                        <div className="user-box__date">2 days ago</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* user-box */}
                <div className="user-box">
                  <div
                    className="user-box__avatar"
                    style={{ backgroundImage: 'url(img/avatar05.jpg)' }}
                  />
                  <div className="user-box__info">
                    <div className="user-box__name">Geunbae "GB" Lee</div>
                    <div className="user-box__inline">
                      <div className="user-box__comment">
                        Sent you a message
                      </div>
                      <div className="user-box__date">5 days ago</div>
                    </div>
                  </div>
                </div>
                {/* user-box */}
                <div className="user-box">
                  <div
                    className="user-box__avatar"
                    style={{ backgroundImage: 'url(img/avatar02.jpg)' }}
                  />
                  <div className="user-box__info">
                    <div className="user-box__name">Riccardo Carlet</div>
                    <div className="user-box__comment">
                      Wrote a comment for your book
                    </div>
                    <div className="user-box__inline">
                      <div className="user-box__link">The Glass Hotel</div>
                      <div className="user-box__date">2 days ago</div>
                    </div>
                  </div>
                </div>
                {/* user-box */}
                <div className="user-box">
                  <div
                    className="user-box__avatar"
                    style={{ backgroundImage: 'url(img/avatar03.jpg)' }}
                  />
                  <div className="user-box__info">
                    <div className="user-box__name">Jeremy Goldberg</div>
                    <div className="user-box__inline">
                      <div className="user-box__comment">Rated your book</div>
                      <div className="user-box__date">2 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`dropdown header-notification  header-notification-user ${
              showDropdown ? 'in' : ''
            }`}
          >
            <button
              className="dropdown-btn btn-login btn-login-active"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span
                className="login-avatar"
                style={{ backgroundImage: 'url(img/user-avatar.png)' }}
              />
              Ryan
            </button>
            <div className="dropdown-box notification-box notification-header-box">
              <div className="header-notification-user__head">
                <div
                  className="header-notification-user__avatar"
                  style={{ backgroundImage: 'url(/img/user-avatar.png)' }}
                />
                <div className="header-notification-user__info">
                  <div className="header-notification-user__name">
                    Ryan Putnam
                  </div>
                  <div className="header-notification-user__username">
                    @rayan_put
                  </div>
                </div>
              </div>
              <div className="header-notification-user__body">
                <ul className="header-notification-user__list">
                  <li>
                    <a href>New story</a>
                  </li>
                  <li className="active">
                    <a href>Reading list</a>
                  </li>
                  <li>
                    <a href>Stories</a>
                  </li>
                  <li>
                    <a href>Publications</a>
                  </li>
                  <li>
                    <a href>Profile</a>
                  </li>
                  <li>
                    <a href>Settings</a>
                  </li>
                  <li>
                    <a href>Help</a>
                  </li>
                </ul>
              </div>
              <div className="header-notification-user__footer">
                <a href>Sign out</a>
              </div>
            </div>
          </div>
          {/* Nav Tel */}
          <a id="nav-toggle">
            <span />
          </a>
          <div className="nav-box-mobile">
            <nav className="header-nav">
              <ul className="header-nav__list">
                <li className="header-nav__item">
                  <a href className="header-nav__link">
                    Read
                    <span className="header-nav__link-icon">
                      <svg className="icon icon-arrow-down">
                        <use xlinkHref="#icon-arrow-down" />
                      </svg>
                    </span>
                  </a>
                </li>
                <li className="header-nav__item">
                  <a href className="header-nav__link">
                    Create
                  </a>
                </li>
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
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )

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
