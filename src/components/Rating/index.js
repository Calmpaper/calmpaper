import React from 'react'
import Rating from 'react-rating'
import { median, round } from './helpers'

export default ({ ratings = [] }) => {
  const stars = ratings.length > 0 ? round(median(ratings), 0.5) : 0
  // const stars = 4.5

  return (
    <fieldset
      className="rating"
      style={{
        marginLeft: -5,
        marginBottom: 8,
      }}
    >
      <input
        type="radio"
        id="star5"
        name="rating"
        value="5"
        checked={stars === 5}
      />
      <label className="full" htmlFor="star5" title="Awesome - 5 stars"></label>

      <input
        type="radio"
        id="star4half"
        name="rating"
        value="4 and a half"
        checked={stars === 4.5}
      />
      <label
        className="half"
        htmlFor="star4half"
        title="Pretty good - 4.5 stars"
      ></label>

      <input
        type="radio"
        id="star4"
        name="rating"
        value="4"
        checked={stars === 4}
      />
      <label
        className="full"
        htmlFor="star4"
        title="Pretty good - 4 stars"
      ></label>

      <input
        type="radio"
        id="star3half"
        name="rating"
        value="3 and a half"
        checked={stars === 3.5}
      />
      <label
        className="half"
        htmlFor="star3half"
        title="Meh - 3.5 stars"
      ></label>

      <input
        type="radio"
        id="star3"
        name="rating"
        value="3"
        checked={stars === 3}
      />
      <label className="full" htmlFor="star3" title="Meh - 3 stars"></label>

      <input
        type="radio"
        id="star2half"
        name="rating"
        value="2 and a half"
        checked={stars === 2.5}
      />
      <label
        className="half"
        htmlFor="star2half"
        title="Kinda bad - 2.5 stars"
      ></label>

      <input
        type="radio"
        id="star2"
        name="rating"
        value="2"
        checked={stars === 2}
      />
      <label
        className="full"
        htmlFor="star2"
        title="Kinda bad - 2 stars"
      ></label>

      <input
        type="radio"
        id="star1half"
        name="rating"
        value="1 and a half"
        checked={stars === 1.5}
      />
      <label
        className="half"
        htmlFor="star1half"
        title="Meh - 1.5 stars"
      ></label>

      <input
        type="radio"
        id="star1"
        name="rating"
        value="1"
        checked={stars === 1}
      />
      <label
        className="full"
        htmlFor="star1"
        title="Sucks big time - 1 star"
      ></label>

      <input
        type="radio"
        id="starhalf"
        name="rating"
        value="half"
        checked={stars === 0.5}
      />
      <label
        className="half"
        htmlFor="starhalf"
        title="Sucks big time - 0.5 stars"
      ></label>
    </fieldset>
  )
}
