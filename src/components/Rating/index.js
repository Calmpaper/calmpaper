import React, { useState } from 'react'
import Rating from 'react-rating'
import { useMutation } from 'urql'
import { setRatingMutation } from 'api'
import { median, round } from './helpers'

export default ({
  ratings = [],
  bookId,
  chapterId,
  voiceId,

  readOnly = false,
  quiet = false,
}) => {
  const initialRating = ratings.length > 0 ? round(median(ratings), 0.5) : 0
  console.log(initialRating)
  console.log(ratings)
  const [stars, setStars] = useState(initialRating)
  const [ratingId, setRatingId] = useState(undefined)
  // eslint-disable-next-line no-unused-vars
  const [setRatingData, setRating] = useMutation(setRatingMutation)

  const submit = (newStars) => {
    setRating({ stars: newStars, bookId, id: ratingId }).then(
      ({ data: { setRating: newRating } = {} }) => {
        setStars(newRating.stars)
        setRatingId(newRating.id)
        // push(`/books/${book.id}`)
      },
    )
  }

  return (
    <div style={{ marginLeft: -5 }}>
      <Rating
        initialRating={stars}
        onChange={(value) => submit(value)}
        step={2}
        stop={10}
        fractions={2}
        className="react-rating"
        emptySymbol="fa fa-star"
        fullSymbol="fa fa-star fa-star-filled"
        readOnly={readOnly}
        quiet={quiet}
      />
    </div>
  )
}
