import React, { useState, useEffect, useContext } from 'react'
import { UserContext, GetStreamContext } from 'context'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getUserQuery } from 'api'
import { useMutation } from 'urql'
import { editUserMutation, followUserMutation, unfollowUserMutation } from 'api'

import Loader from 'components/Loader'
import Header from 'components/Layout/Header'
import Footer from 'components/molecules/footer'
import Books from './Books'
import Feed from './Feed'
import Followers from './Followers'
import Following from './Following'
// import Flex from 'components/Flex'
import AvatarInput from 'components/Input/AvatarInput'

export default () => {
  const [isEditing, setEditing] = useState(false)
  const [tab, setTab] = useState('feed')
  const [editingUsername, setEditingUsername] = useState(null)
  const [editingFullname, setEditingFullname] = useState(null)
  const { id: slug } = useParams()

  let userId
  let username

  if (slug.startsWith('@')) {
    username = slug.substring(1)
  } else {
    userId = slug
  }

  const { user: loggedUser } = useContext(UserContext)
  const [image, setImage] = useState(null)

  const [, editUser] = useMutation(editUserMutation)

  const [{ data: { user } = {}, fetching, error }] = useQuery({
    query: getUserQuery,
    variables: username ? { username } : { id: parseInt(userId) },

    pause: !slug,
  })

  useEffect(() => {
    if (user && user.avatar) {
      setEditingUsername(user.username || `user${user.id}`)
      setEditingFullname(user.fullname)
      setImage(user.avatar)
    }
  }, [user])

  useEffect(() => {
    setImage(image)
    // update profile image
  }, [image])

  const { notificationsFeed } = useContext(GetStreamContext)
  const isFollowing =
    user && loggedUser && loggedUser.following.find((u) => u.id === user.id)

  const [, followUser] = useMutation(followUserMutation)
  const [, unfollowUser] = useMutation(unfollowUserMutation)

  const follow = () => {
    if (isFollowing) {
      notificationsFeed.unfollow('user', user.id)
      unfollowUser({ followerId: loggedUser.id, followingId: user.id })
    } else {
      notificationsFeed.follow('user', user.id)
      followUser({ followerId: loggedUser.id, followingId: user.id })
    }
  }

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <>
      <Header withLine />
      <div className="page-home05 page-home">
        <div className="user-block">
          <div
            className="container"
            style={{ backgroundImage: 'url(/img/home05/home05-bg.png)' }}
          >
            <div className="row">
              <div className="item item-user">
                {isEditing ? (
                  <AvatarInput avatar={user.avatar} setImage={setImage} />
                ) : (
                  <div
                    className="user-avatar"
                    style={{ backgroundImage: `url("${user.avatar}")` }}
                  />
                )}

                <div
                  className="user-info"
                  style={
                    isEditing
                      ? { display: 'flex', flexDirection: 'column' }
                      : {}
                  }
                >
                  {isEditing ? (
                    <input
                      value={editingFullname}
                      onChange={(e) => setEditingFullname(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <div className="user-name">{user.fullname}</div>
                  )}

                  {isEditing ? (
                    <input
                      value={editingUsername}
                      onChange={(e) => setEditingUsername(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <div className="user-town">
                      {user.username ? `@${user.username}` : `@user${user.id}`}
                    </div>
                  )}
                </div>
              </div>
              <div className="item item-buttons">
                {loggedUser &&
                (loggedUser.id === parseInt(userId) ||
                  loggedUser.username === username) ? (
                  <>
                    {isEditing ? (
                      <button
                        className="btn btn-line"
                        onClick={() => {
                          editUser({
                            userId: loggedUser.id,
                            username: editingUsername,
                            fullname: editingFullname,
                            avatar: image,
                          })
                          setEditing(false)
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-line"
                        onClick={() => setEditing(true)}
                      >
                        Edit
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button className="btn btn-line" onClick={follow}>
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                    {/*
                    <button className="btn btn-line">Message</button>
                    <button className="btn btn-line">Tip</button>
                    */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="tabs">
          <div className="container">
            <div className="row">
              <a
                onClick={() => setTab('feed')}
                className={tab === 'feed' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                Feed
              </a>
              <a
                onClick={() => setTab('following')}
                className={tab === 'following' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                Following
              </a>
              <a
                onClick={() => setTab('followers')}
                className={tab === 'followers' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                Followers
              </a>
            </div>
          </div>
        </div>
        {tab === 'feed' && (
          <>
            <Feed authorId={user.id} />
            <Books books={user.books} />
          </>
        )}
        {tab === 'followers' && <Followers users={user.followers} />}
        {tab === 'following' && <Following users={user.following} />}

        <Footer centered />
      </div>
    </>
  )
}
