import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext, GetStreamContext } from 'context'
import { useMutation } from 'urql'
import { followUserMutation, unfollowUserMutation } from 'api'
import { getUserSlug, getUserDisplayName } from 'helpers'

import DonationModal from 'components/DonationModal'

export default ({ chapterId, author }) => {
  const [showDonationModal, setShowDonationModal] = useState(false)
  const { user } = useContext(UserContext)
  const { notificationsFeed } = useContext(GetStreamContext)

  const isFollowing = user && user.following.find((u) => u.id === author.id)

  const [, followUser] = useMutation(followUserMutation)
  const [, unfollowUser] = useMutation(unfollowUserMutation)

  const follow = () => {
    if (isFollowing) {
      notificationsFeed.unfollow('user', author.id)
      unfollowUser({ followerId: user.id, followingId: author.id })
    } else {
      notificationsFeed.follow('user', author.id)
      followUser({ followerId: user.id, followingId: author.id })
    }
  }

  return (
    <div className="read-book-author">
      <div className="container">
        <div className="row">
          <Link to={`/${getUserSlug(author)}`}>
            <div className="col col01">
              <div
                className="avatar"
                style={{ backgroundImage: `url('${author.avatar}')` }}
              />
              <div className="item-info">
                <h3 className="item-title">{getUserDisplayName(author)}</h3>
                <p className="item-subtitle">Author</p>
                {/*author.followers.length > 0 && (
                  <p className="item-subtitle">{`${author.followers.length} ${
                    author.followers.length === 1 ? 'follower' : 'followers'
                  }`}</p>
                    )*/}
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
          <div className="col col02">
            <button className="btn btn-color" onClick={follow}>
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            {/*
        <button className="btn btn-line">Subscribe</button>
        */}
          </div>
        </div>
      </div>
    </div>
  )
}
