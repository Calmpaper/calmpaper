import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { useMutation } from 'urql'
import {
  setReviewLikeMutation,
  removeLikeMutation,
  updateReviewMutation,
  deleteReviewMutation,
} from 'api'

import Rating from 'react-rating'
import Flex from 'atomic/atoms/flex'
import Like from 'atomic/atoms/like'
import More from './More'

import * as S from './Review.styled'

export default ({ review }) => {
  const [editing, setEditing] = useState(false)
  const [editingValue, setEditingValue] = useState(review.message)
  const [stars, setStars] = useState(review.stars)
  const { user } = useContext(UserContext)

  const [, setLike] = useMutation(setReviewLikeMutation)
  const [, removeLike] = useMutation(removeLikeMutation)
  const [, updateReview] = useMutation(updateReviewMutation)
  const [, deleteReview] = useMutation(deleteReviewMutation)

  const onLike = (like) => {
    if (!user) return

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
              {review.author.username || review.author.fullname}{' '}
              {/*
              <span>· {moment(comment.createdAt).fromNow()}</span>
              */}
            </h4>
            <div className="comment-text">
              {editing ? (
                <input
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  autoFocus
                />
              ) : (
                <p>{review.message}</p>
              )}
            </div>
          </div>
          <div className="comment-footer__container">
            <div className="comment-footer__controls">
              <div style={{ width: 0, marginLeft: -4 }} />
              <Like
                likes={review.likes}
                onLike={onLike}
                like={
                  user &&
                  review.likes.find((like) => like.author.id === user.id)
                }
              />
              {user && user.id === review.author.id && (
                <div className="comment-context-menu__container">
                  <More
                    reviewId={review.id}
                    setEditing={setEditing}
                    onDelete={() => deleteReview({ reviewId: review.id })}
                  />
                  {editing && (
                    <button
                      onClick={() => {
                        updateReview({
                          reviewId: review.id,
                          stars,
                          message: editingValue,
                        })
                        setEditing(false)
                      }}
                    >
                      Save
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Flex>
      </Flex>
      <div style={{ marginTop: 0 }} className="rating">
        <Rating
          initialRating={stars}
          onChange={(s) => setStars(s)}
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
          readonly={!editing}
          quiet={!editing}
        />
      </div>
    </S.Container>
  )
}
