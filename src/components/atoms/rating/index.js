import React from 'react'
import { transformRating } from 'helpers'

export default ({ rating, isBookCard }) => {
  const isNA = rating === undefined || rating === null || rating === 0

  return (
    <div
      className="about-num-panel-info"
      style={
        isBookCard
          ? {
              display: 'flex',
            }
          : {}
      }
    >
      <div className="icon-box icon-box-paint">
        <svg
          className={`icon icon-rating ${isNA ? 'empty' : 'filled'}`}
          style={
            isBookCard
              ? {
                  // width: '16px',
                  // marginRight: '4px',
                  // height: '16px',
                }
              : {}
          }
        >
          <use xlinkHref="#icon-rating" />
        </svg>
      </div>
      <div className="panel-num catalog-author">{transformRating(rating)}</div>
    </div>
  )
}
