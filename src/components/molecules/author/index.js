import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from 'context'
import { useMutation } from 'urql'
import { followUserMutation, unfollowUserMutation } from 'api'

export const author = ({ author }) => {
  const { user } = useContext(UserContext)
  // const { notificationsFeed } = useContext(GetStreamContext)
  const isFollowing = user && user.following.find((u) => u.id === author.id)

  const [, followUser] = useMutation(followUserMutation)
  const [, unfollowUser] = useMutation(unfollowUserMutation)

  const follow = () => {
    if (isFollowing) {
      // notificationsFeed.unfollow('user', author.id)
      unfollowUser({ followerId: user.id, followingId: author.id })
    } else {
      // notificationsFeed.follow('user', author.id)
      followUser({ followerId: user.id, followingId: author.id })
    }
  }

  return (
    <div className="sidebar-box sidebar-author">
      <h4 className="title size04">Author</h4>
      <Link href={`/authors/[author]`} as={`/authors/${author.id}`}>
        <div className="sidebar-author-info">
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
      </Link>
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
