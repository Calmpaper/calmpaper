import React, { useState, useContext } from 'react'
import { UserContext, GetStreamContext } from 'context'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'urql'
import { followUserMutation, unfollowUserMutation } from 'api'
import DonationModal from 'components/DonationModal'

export default ({ author, bookId }) => {
  const [showDonationModal, setShowDonationModal] = useState(false)
  const { user } = useContext(UserContext)
  const { notificationsFeed } = useContext(GetStreamContext)
  const { push } = useHistory()
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

  if (!author) return null

  return (
    <div className="sidebar-box sidebar-author">
      <h4 className="title size04">Author</h4>
      <div
        className="sidebar-author-info"
        onClick={() =>
          push(`/users/${author.username ? `@${author.username}` : author.id}`)
        }
        style={{ cursor: 'pointer' }}
      >
        <div
          className="author-avatar"
          style={{ backgroundImage: `url('${author.avatar}')` }}
        />
        <div className="author-info">
          <div className="author-name">
            {author.username || author.fullname}
          </div>
          {author.followers.length > 0 ? (
            <div className="author-country">{`${author.followers.length} ${
              author.followers.length === 1 ? 'follower' : 'followers'
            }`}</div>
          ) : (
            <div className="author-country">
              {user.username ? `@${user.username}` : `@user${user.id}`}
            </div>
          )}
        </div>
      </div>
      <div className="buttons">
        <button className="btn btn-line btn-br" onClick={follow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
        {/* author.stripeId && (
          <button
            className="btn btn-line btn-br"
            onClick={() => setShowDonationModal(true)}
          >
            Donate
          </button>
            ) */}
        {/*
        <button className="btn btn-line btn-br" onClick={message}>
          Message
        </button>
        <button className="btn btn-line" onClick={tip}>
          Tip
        </button>
        */}
      </div>
      {showDonationModal && (
        <DonationModal
          bookId={bookId}
          show={showDonationModal}
          close={() => setShowDonationModal(false)}
          author={author}
        />
      )}
    </div>
  )
}
