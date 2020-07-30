import { useState, useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import { useMutation } from 'urql'
import { getUserQuery, editUsernameMutation } from 'api'

import * as atoms from 'components/atoms'
import * as molecules from 'components/molecules'
import * as organisms from 'components/organisms'

// import Books from './Books'
// import AvatarInput from 'components/Input/AvatarInput'

import * as S from './User.styled'

// export const user = ({ user }) => <div className="page-user">user</div>

export const user = () => {
  const [isEditing, setEditing] = useState(false)
  const [editingValue, setEditingValue] = useState(null)
  const router = useRouter()
  const { user: userId } = router.query
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

  if (!user) return null
  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <>
      <molecules.header />
      <atoms.flex
        alignCenter
        justifyCenter
        style={{ width: '100vw', height: '100%', marginTop: 128 }}
      >
        <atoms.flex column alignEnd>
          <S.Container>
            <S.User row spaceBetween alignCenter>
              <atoms.flex
                row
                alignCenter
                justifyBetween
                style={{ width: '100%' }}
              >
                <atoms.flex row alignCenter>
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
                </atoms.flex>
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
              </atoms.flex>
            </S.User>
            {/*
            <Books books={user.books} />
            */}
          </S.Container>
          {loggedUser && loggedUser.id === user.id && (
            <atoms.flex
              alignCenter
              justifyCenter
              className="btn btn-br"
              style={{
                alignSelf: 'flex-end',
              }}
              onClick={logout}
            >
              Log out
            </atoms.flex>
          )}
        </atoms.flex>
      </atoms.flex>
      <molecules.footer centered />
    </>
  )
}
