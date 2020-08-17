import React, { useState } from 'react'
import DonationModal from 'components/DonationModal'
import { Link } from 'react-router-dom'

export default ({ chapterId, author }) => {
  const [showDonationModal, setShowDonationModal] = useState(false)

  return (
    <div className="read-book-author">
      <div className="container">
        <div className="row">
          <Link to={`/users/${author.id}`}>
            <div className="col col01">
              <div
                className="avatar"
                style={{ backgroundImage: `url('${author.avatar}')` }}
              />
              <div className="item-info">
                <h3 className="item-title">
                  {author.username || author.fullname}
                </h3>
                {author.followers.length > 0 && (
                  <p className="item-subtitle">{`${author.followers.length} ${
                    author.followers.length === 1 ? 'follower' : 'followers'
                  }`}</p>
                )}
              </div>
            </div>
          </Link>
          {author.stripeId && (
            <button
              onClick={() => setShowDonationModal(true)}
              className="btn btn-color"
            >
              Donate
            </button>
          )}
          {showDonationModal && (
            <DonationModal
              chapterId={chapterId}
              author={author}
              show={showDonationModal}
              close={() => setShowDonationModal(false)}
            />
          )}
          {/*
        <div className="col col02">
          <svg className="icon icon-quote">
            <use xlinkHref="#icon-quote" />
          </svg>
          <div className="item-quote">Support Rising from the Depths</div>
        </div>
        <div className="col col03">
          <a href="https://www.patreon.com/jgthms">
            <button className="btn btn-color">
              <svg className="icon icon-patreon">
                <use xlinkHref="#icon-patreon" />
              </svg>
              Patreon
            </button>
          </a>
        </div>
        */}
        </div>
      </div>
    </div>
  )
}
