import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getUserQuery } from 'api'

import Loader from 'components/Loader'
import Rating from 'components/Rating'
import Books from './Books'
import Flex from 'components/Flex'

import * as S from './User.styled'

const hashcode = (s) =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

export default () => {
  const { username } = useParams()

  const [{ data: { user } = {}, fetching, error }] = useQuery({
    query: getUserQuery,
    variables: {
      username: username,
    },
    pause: !username,
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>
  console.log(user)

  return (
    <S.Container>
      <S.User row spaceBetween alignCenter>
        <Flex row alignCenter>
          <S.Avatar
            src={`https://www.gravatar.com/avatar/${hashcode(
              username,
            )}?d=robohash&f=y`}
          />
          <S.Username>{user.username}</S.Username>
        </Flex>
        <Rating ratings={user.ratings} userId={user.id} />
      </S.User>
      <Books books={user.books} />
    </S.Container>
  )
}
