import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getUserQuery } from 'api'
import { useMutation } from 'urql'
import { editUsernameMutation } from 'api'

import Loader from 'components/Loader'
import Header from 'components/Layout/Header'
import Footer from 'components/molecules/footer'
import Books from './Books'
import Flex from 'components/Flex'
// import AvatarInput from 'components/Input/AvatarInput'

import * as S from './User.styled'

export default () => {
  const [isEditing, setEditing] = useState(false)
  const [editingValue, setEditingValue] = useState(null)
  const { id: userId } = useParams()
  const { logout, user: loggedUser } = useContext(UserContext)
  const [image, setImage] = useState(null)

  const [, editUsername] = useMutation(editUsernameMutation)

  const [{ data: { user } = {}, fetching, error }] = useQuery({
    query: getUserQuery,
    variables: {
      id: parseInt(userId),
    },
    pause: !userId,
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
      <Header />
      <Flex
        alignCenter
        justifyCenter
        style={{ width: '100vw', height: '100%', marginTop: 128 }}
      >
        <Flex column alignEnd>
          <S.Container>
            <S.User row spaceBetween alignCenter>
              <Flex row alignCenter justifyBetween style={{ width: '100%' }}>
                <Flex row alignCenter>
                  <img
                    width="32"
                    height="32"
                    src={user.avatar}
                    style={{ marginRight: 12, borderRadius: '100%' }}
                    alt={user.givenname}
                  />
                  {isEditing ? (
                    <input
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <S.Username>{user.username || user.fullname}</S.Username>
                  )}
                </Flex>
                {loggedUser &&
                  loggedUser.id === parseInt(userId) &&
                  (isEditing ? (
                    <button
                      onClick={() => {
                        editUsername({
                          userId: loggedUser.id,
                          username: editingValue,
                        })
                        setEditing(false)
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button onClick={() => setEditing(true)}>Edit</button>
                  ))}
              </Flex>
            </S.User>
            <Books books={user.books} />
          </S.Container>
          {loggedUser && loggedUser.id === user.id && (
            <Flex
              alignCenter
              justifyCenter
              className="btn btn-br"
              style={{
                alignSelf: 'flex-end',
              }}
              onClick={logout}
            >
              Log out
            </Flex>
          )}
        </Flex>
      </Flex>
      <Footer centered />
    </>
  )
}
