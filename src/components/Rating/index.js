import React, { useState, useContext } from 'react'
import Rating from 'react-rating'
import { useMutation } from 'urql'
import { setRatingMutation } from 'api'
import { UserContext } from 'context'

export default ({
  ratings = [],
  bookId,
  readOnly = false,
  quiet = false,
  cursorDefault = false,
}) => {
  const { user } = useContext(UserContext)

  let sum = 0
  for (let i = 0; i < ratings.length; i++) {
    sum += parseInt(ratings[i].stars, 10) //don't forget to add the base
  }

  var avg = sum / ratings.length

  const initialRating = ratings.length > 0 ? avg : 0
  const [stars, setStars] = useState(initialRating)
  const [ratingId, setRatingId] = useState(undefined)
  // eslint-disable-next-line no-unused-vars
  const [data, setRating] = useMutation(setRatingMutation)

  const submit = (value) => {
    setRating({
      stars: value,
      authorId: user.id,
      id: ratingId,
      bookId,
    }).then(({ data: { setReview: res } = {} }) => {
      setStars(res.stars)
      setRatingId(res.id)
    })
  }

  return (
    <div
      style={{
        // marginLeft: -5,
        minWidth: 143,
        cursor: cursorDefault ? 'default' : 'pointer',
      }}
      className="rating"
    >
      <Rating
        initialRating={stars}
        onChange={(value) => submit(value)}
        step={2}
        stop={10}
        fractions={2}
        className="react-rating"
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
        readOnly={readOnly}
        quiet={quiet}
      />
    </div>
  )
}
