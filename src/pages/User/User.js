import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getUserQuery } from 'api'

import Loader from 'components/Loader'
import Header from 'components/Layout/Header'
import Footer from 'components/Layout/Footer'
import Books from './Books'
import Flex from 'components/Flex'
// import AvatarInput from 'components/Input/AvatarInput'

import * as S from './User.styled'

export default () => {
  const { id: userId } = useParams()
  const { logout, user: loggedUser } = useContext(UserContext)
  const [image, setImage] = useState(null)

  const [{ data: { user } = {}, fetching, error }] = useQuery({
    query: getUserQuery,
    variables: {
      id: parseInt(userId),
    },
    pause: !userId,
  })

  useEffect(() => {
    if (user && user.avatar) {
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
              <Flex row alignCenter>
                <img
                  width="32"
                  height="32"
                  src={user.avatar}
                  style={{ marginRight: 12, borderRadius: '100%' }}
                  alt={user.givenname}
                />
                <S.Username>{user.fullname}</S.Username>
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
