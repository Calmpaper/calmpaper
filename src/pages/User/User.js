import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getUserQuery } from 'api'

import Loader from 'components/Loader'
import Rating from 'components/Rating'
import Books from './Books'
import Flex from 'components/Flex'
import AvatarInput from 'components/Input/AvatarInput'

import * as S from './User.styled'

const hashcode = (s) =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

export default () => {
  const { username } = useParams()
  const [image, setImage] = useState(null)

  const [{ data: { user } = {}, fetching, error }] = useQuery({
    query: getUserQuery,
    variables: {
      username: username,
    },
    pause: !username,
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
  console.log(user)

  const avatar = `https://www.gravatar.com/avatar/${hashcode(
    username,
  )}?d=robohash&f=y`

  return (
    <S.Container>
      <S.User row spaceBetween alignCenter>
        <Flex row alignCenter>
          <AvatarInput avatar={avatar} setImage={setImage} />
          <S.Username>{user.username}</S.Username>
        </Flex>
        <Rating ratings={user.ratings} userId={user.id} />
      </S.User>
      <Books books={user.books} />
    </S.Container>
  )
}
