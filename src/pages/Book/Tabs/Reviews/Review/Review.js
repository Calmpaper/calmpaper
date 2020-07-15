import React, { useContext } from 'react'
import { UserContext } from 'context'
import { useMutation } from 'urql'
import { setReviewLikeMutation, removeLikeMutation } from 'api'

import Flex from 'components/Flex'
import Rating from 'react-rating'
import Likes from 'components/Comments/Comment/Likes'

import * as S from './Review.styled'

export default ({ review }) => {
  const { user } = useContext(UserContext)

  // eslint-disable-next-line no-unused-vars
  const [_, setLike] = useMutation(setReviewLikeMutation)

  // eslint-disable-next-line no-unused-vars
  const [__, removeLike] = useMutation(removeLikeMutation)
  // console.log(user)

  const like = user && review.likes.find((like) => like.author.id === user.id)
  const onLike = () => {
    if (like) {
      removeLike({
        likeId: parseInt(like.id),
      })
    } else {
      setLike({
        authorId: user.id,
        reviewId: review.id,
      })
    }
  }

  return (
    <S.Container className="comment-item">
      <Flex row alignCenter>
        <div
          className="comment-avatar"
          style={{ backgroundImage: `url('${review.author.avatar}')` }}
        />
        <Flex column>
          <div className="comment-info">
            <h4 className="comment-title">
              {review.author.fullname}{' '}
              {/*
              <span>· {moment(comment.createdAt).fromNow()}</span>
              */}
            </h4>
            <div className="comment-text">
              <p>{review.message}</p>
            </div>
          </div>
          <div className="comment-footer__container">
            <div className="comment-footer__controls">
              <div style={{ width: 0, marginLeft: -4 }} />
              <Likes likes={review.likes} onLike={onLike} isLiked={!!like} />
            </div>
          </div>
        </Flex>
      </Flex>
      <div style={{ marginTop: 0 }} className="rating">
        <Rating
          initialRating={review.stars}
          step={2}
          stop={10}
          fractions={2}
          className="react-rating rr4r nopointer"
          emptySymbol={
            <svg className="icon icon-rating">
              <use xlinkHref="#icon-rating" />
            </svg>
          }
          fullSymbol={
            <svg className="icon icon-rating active">
              <use xlinkHref="#icon-rating" />
            </svg>
          }
          readonly
          quiet
        />
      </div>
    </S.Container>
  )
}
