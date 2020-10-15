import React, { useState, useEffect, useContext } from 'react'
import { UserContext, GetStreamContext } from 'context'
import { useParams } from 'react-router-dom'
import { useMutation } from 'urql'
import { editUserMutation, followUserMutation, unfollowUserMutation } from 'api'
import AvatarInput from 'components/Input/AvatarInput'

export default ({ user }) => {
  const { userId, username } = useParams()

  const [isEditing, setEditing] = useState(false)
  const [editingUsername, setEditingUsername] = useState(null)
  const [editingFullname, setEditingFullname] = useState(null)
  const [editingBio, setEditingBio] = useState(null)
  const [, editUser] = useMutation(editUserMutation)
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (user) {
      setEditingUsername(user.username || `user${user.id}`)
      setEditingFullname(user.fullname)
      setEditingBio(user.bio || '')
      setImage(user.avatar)
    }
  }, [user])

  // useEffect(() => {
  //   setImage(image)
  //   // update profile image
  // }, [image])

  const { user: loggedUser } = useContext(UserContext)
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

  const isYou =
    loggedUser &&
    (loggedUser.id === parseInt(userId) || loggedUser.username === username)

  return (
    <div className="user-block">
      <div className="container">
        <div className="row">
          <div
            className="item-bg"
            style={{ backgroundImage: 'url(/img/profile02/profile02-bg.png)' }}
          />
          <div className="item">
            {isEditing ? (
              <AvatarInput avatar={user.avatar} setImage={setImage} />
            ) : (
              <div
                className="user-avatar"
                style={{ backgroundImage: `url("${user.avatar}")` }}
              />
            )}
            <div className="user-info">
              <div className="user-name">
                {isEditing ? (
                  <input
                    value={editingFullname}
                    onChange={(e) => setEditingFullname(e.target.value)}
                    placeholder="Full name"
                    style={{ width: 200 }}
                  />
                ) : (
                  user.fullname
                )}
              </div>
              <div className="user-username">
                {user.username ? '@' : isEditing ? '@' : '@user'}
                {isEditing ? (
                  <input
                    value={editingUsername}
                    onChange={(e) => setEditingUsername(e.target.value)}
                    placeholder="Username"
                    autoFocus
                  />
                ) : (
                  user.username || user.id
                )}
              </div>
              <div className="user-text">
                {isEditing ? (
                  <textarea
                    value={editingBio}
                    onChange={(e) => setEditingBio(e.target.value)}
                    placeholder="Tell something about yourself"
                    autoFocus
                    style={{
                      width: '500px',
                      minHeight: '80px',
                    }}
                  />
                ) : (
                  user.bio
                )}
              </div>
            </div>

            {isYou ? (
              <div className="user-buttons">
                {isEditing ? (
                  <button
                    className="btn btn-color"
                    onClick={() => {
                      editUser({
                        userId: loggedUser.id,
                        username: (editingUsername || '').toLowerCase(),
                        fullname: editingFullname,
                        bio: editingBio,
                        avatar: image,
                      })
                      setEditing(false)
                    }}
                    style={{ color: 'white' }}
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
              </div>
            ) : (
              <div className="user-buttons">
                <button className="btn btn-line" onClick={follow}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
