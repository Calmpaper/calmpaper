import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'urql'
import { getUserQuery } from 'api'
import CryptoJS from 'crypto-js'
import queryString from 'query-string'

import Loader from 'components/Loader'

export default () => {
  const location = useLocation()
  const parsed = queryString.parse(location.search)

  var bytes = CryptoJS.AES.decrypt(parsed.from, 'Look, a smart ass!')
  var originalText = bytes.toString(CryptoJS.enc.Utf8)
  const inviteFrom = parseInt(originalText.substring(4))

  let userId = inviteFrom

  const [{ data: { user } = {}, fetching, error }] = useQuery({
    query: getUserQuery,
    variables: { id: parseInt(userId) },

    pause: !userId,
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  if (!user) {
    return <div>Sorry, the link is broken</div>
  }

  return (
    <div className="page-invite">
      <div className="container">
        <div className="row">
          <div className="item">
            <img src="/img/logo-black.svg" alt="logo" className="item-logo" />
            <h2 className="item-title">Join Calmpaper</h2>
            <p className="item-text">
              <b>{user.username || user.givenname}</b> has invited you to use
              Calmpaper with them to read and write unfinished books. Even 1
              page is ok!
            </p>
            <div className="item-blocks">
              <div className="block block01">
                <h3 className="block-title">{`Follow ${
                  user.username || user.givenname
                }`}</h3>
                <p className="block-subtitle">{`calmpaper.org/users/${inviteFrom}`}</p>
                <button
                  className="btn btn-color"
                  onClick={() => {
                    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google?from=${parsed.from}`
                  }}
                >
                  Join now{' '}
                  <svg className="icon icon-right">
                    <use xlinkHref="#icon-right04" />
                  </svg>
                </button>
              </div>
              <div className="block block02">
                <h3 className="block-title">
                  {user.username || user.fullname}
                </h3>
                <p className="block-subtitle">has already joined</p>
                <a href>
                  <img
                    src={user.avatar}
                    alt={user.username || user.fullname}
                    style={{ width: 46, height: 46 }}
                  />
                </a>
              </div>
            </div>
            <h2 className="item-title">What is Calmpaper?</h2>
            <p className="item-text">
              A platform for unfinished books. Share your unfinished books after
              finishing the first page, not 300 pages later. The site is
              currently in beta and is invite-only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
