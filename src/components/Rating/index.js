import React, { useState, useContext } from 'react'
import Rating from 'react-rating'
import { useMutation } from 'urql'
import { setRatingMutation } from 'api'
import { UserContext } from 'context'

export default ({
  ratings = [],
  userId,
  bookId,
  chapterId,
  voiceId,

  readOnly = false,
  quiet = false,
}) => {
  const { username } = useContext(UserContext)

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
      authorUsername: username,
      id: ratingId,
      userId,
      bookId,
      chapterId,
      voiceId,
    }).then(({ data: { setRating: res } = {} }) => {
      setStars(res.stars)
      setRatingId(res.id)
      // push(`/books/${book.id}`)
    })
  }

  return (
    <div style={{ marginLeft: -5, minWidth: 143 }}>
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
