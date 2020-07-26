import React, { useContext } from 'react'
import { UserContext, GetStreamContext } from 'context'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'urql'
import { followUserMutation, unfollowUserMutation } from 'api'

export default ({ author }) => {
  const { user } = useContext(UserContext)
  const { notificationsFeed } = useContext(GetStreamContext)
  const { push } = useHistory()
  const isFollowing = user && user.following.find((u) => u.id === author.id)

  // eslint-disable-next-line no-unused-vars
  const [_, followUser] = useMutation(followUserMutation)

  // eslint-disable-next-line no-unused-vars
  const [__, unfollowUser] = useMutation(unfollowUserMutation)

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
    <div className="sidebar-box sidebar-author">
      <h4 className="title size04">Author</h4>
      <div
        className="sidebar-author-info"
        onClick={() => push(`/users/${author.id}`)}
      >
        <div
          className="author-avatar"
          style={{ backgroundImage: `url('${author.avatar}')` }}
        />
        <div className="author-info">
          <div className="author-name">
            {author.username || author.fullname}
          </div>
          <div className="author-country">{`${author.followers.length} ${
            author.followers.length === 1 ? 'follower' : 'followers'
          }`}</div>
        </div>
      </div>
      <div className="buttons">
        <button className="btn btn-line btn-br" onClick={follow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
        {/*
        <button className="btn btn-line btn-br" onClick={message}>
          Message
        </button>
        <button className="btn btn-line" onClick={tip}>
          Tip
        </button>
        */}
      </div>
    </div>
  )
}
