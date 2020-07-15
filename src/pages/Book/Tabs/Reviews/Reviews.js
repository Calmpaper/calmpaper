import React, { useState, useContext } from 'react'
import { UserContext, GetStreamContext } from 'context'
import { useParams } from 'react-router-dom'
import { useMutation } from 'urql'
import { addReviewMutation } from 'api'
import Rating from 'react-rating'
import Flex from 'components/Flex'
import Input from 'components/Comments/Input'
import Review from './Review'

const AddReview = ({ book }) => {
  const { book: bookId } = useParams()
  const { addActivity } = useContext(GetStreamContext)
  const [stars, setStars] = useState(0)
  const { user } = useContext(UserContext)
  const [{ error }, addReview] = useMutation(addReviewMutation)

  const onLeaveReview = (message) => {
    addReview({
      stars,
      message,
      authorId: user.id,
      bookId: parseInt(bookId),
    })

    // TODO: done NOTIFICATION: send comment "Maxim Ignatev review your book"
    addActivity({
      verb: 'review',
      object: `book:${bookId}`,
      user,
      book,
    })
  }
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <Flex column alignEnd style={{ width: 'min-content', marginTop: 8 }}>
      <Input
        style={{ marginBottom: 0 }}
        inputWidth={540}
        placeholder="Leave a review"
        onSubmit={onLeaveReview}
      />
      <div style={{ marginTop: 8, marginRight: 22 }} className="rating">
        <Rating
          initialRating={stars}
          step={2}
          onChange={(s) => setStars(s)}
          stop={10}
          fractions={2}
          className="react-rating nopointer rr6l"
          emptySymbol={
            <svg
              className="icon icon-rating"
              style={{ height: 19, width: 19, marginLeft: 0, marginRight: 0 }}
            >
              <use xlinkHref="#icon-rating" />
            </svg>
          }
          fullSymbol={
            <svg
              className="icon icon-rating active"
              style={{ height: 19, width: 19, marginLeft: 0, marginRight: 0 }}
            >
              <use xlinkHref="#icon-rating" />
            </svg>
          }
        />
      </div>
    </Flex>
  )
}

export default ({ reviews, book }) => {
  const { user } = useContext(UserContext)
  const hasLeftReview =
    user && reviews.find((review) => review.author.id === user.id)

  return (
    <Flex column className="comments" style={{ marginTop: 36 }}>
      {user && !hasLeftReview && <AddReview book={book} />}
      {reviews.map((review) => (
        <Review review={review} />
      ))}
    </Flex>
  )
}
