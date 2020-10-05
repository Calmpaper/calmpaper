import React, { useContext } from 'react'
import moment from 'moment'
import { UserContext } from 'context'
import { useQuery } from 'urql'
import { getCommentsFeedQuery } from 'api'
import { Link } from 'react-router-dom'

import Flex from 'components/atoms/flex'
import Loader from 'components/Loader'

export default () => {
  const { user } = useContext(UserContext)
  const [{ data: { comments } = {}, fetching, error }] = useQuery({
    query: getCommentsFeedQuery,
    variables: {
      users: user.following.map((follower) => follower.id),
    },
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div>
      {comments.map((comment) => (
        <Flex
          row
          justifyBetween
          style={{
            marginBottom: 16,
            borderBottom: '1px solid rgba(0, 0, 0, .15)',
          }}
        >
          <Flex row>
            <img
              src={comment.author.avatar}
              alt="avatar"
              style={{ width: 48, height: 48 }}
            />
            <Flex column>
              {`${
                comment.author.username || comment.author.fullname
              } commented on ${
                comment.chapter
                  ? `chapter ${comment.chapter.title}`
                  : comment.book
                  ? `book ${comment.book.name}`
                  : ''
              }`}
              {comment.body}
            </Flex>
          </Flex>
          {moment(comment.createdAt).fromNow()}
        </Flex>
      ))}
    </div>
  )
}
