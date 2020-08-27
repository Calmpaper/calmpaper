import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getUserQuery } from 'api'
import { useMutation } from 'urql'
import { editUserMutation } from 'api'

import Loader from 'components/Loader'
import Header from 'components/Layout/Header'
import Footer from 'components/molecules/footer'
import Books from './Books'
import Flex from 'components/Flex'
import AvatarInput from 'components/Input/AvatarInput'

export default () => {
  const [isEditing, setEditing] = useState(false)
  const [editingValue, setEditingValue] = useState(null)
  const { id: slug } = useParams()

  let userId
  let username

  if (slug.startsWith('@')) {
    username = slug.substring(1)
  } else {
    userId = slug
  }

  const { logout, user: loggedUser } = useContext(UserContext)
  const [image, setImage] = useState(null)

  const [, editUser] = useMutation(editUserMutation)

  const [{ data: { user } = {}, fetching, error }] = useQuery({
    query: getUserQuery,
    variables: username ? { username } : { id: parseInt(userId) },

    pause: !slug,
  })

  useEffect(() => {
    if (user && user.avatar) {
      setEditingValue(user.username || user.fullname)
      setImage(user.avatar)
    }
  }, [user])

  useEffect(() => {
    // update profile image
  }, [image])

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <>
      <Header withLine />
      <div className="page-home05">
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
                    style={{ backgroundImage: `url(${user.avatar})` }}
                  />
                )}

                <div className="user-info">
                  <div className="user-name">
                    {user.fullname || user.username}
                  </div>

                  {user.username &&
                    (isEditing ? (
                      <input
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <div className="user-town">{`@${user.username}`}</div>
                    ))}
                </div>
              </div>
              <div className="item item-buttons">
                {loggedUser &&
                (loggedUser.id === parseInt(userId) ||
                  loggedUser.username === username) ? (
                  <>
                    <Flex
                      alignCenter
                      justifyCenter
                      className="btn btn-line"
                      style={{
                        alignSelf: 'flex-end',
                      }}
                      onClick={logout}
                    >
                      Log out
                    </Flex>
                    {isEditing ? (
                      <button
                        className="btn btn-line"
                        onClick={() => {
                          editUser({
                            userId: loggedUser.id,
                            username: editingValue,
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
                    <button className="btn btn-line">Follow</button>
                    <button className="btn btn-line">Message</button>
                    <button className="btn btn-line">Tip</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="tabs">
          <div className="container">
            <div className="row">
              <a href className="active">
                All books
              </a>
              <a href>Popular</a>
            </div>
          </div>
        </div>
        <Books books={user.books} />

        <Footer centered />
      </div>
    </>
  )
}
