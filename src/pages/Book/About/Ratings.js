import React from 'react'

import 'assets/css/about.css'
// import Rating from 'components/Rating'
// <Rating ratings={book.reviews} bookId={book.id} />
const Stars = ({ reviews }) => {
  let sum = 0
  for (let i = 0; i < reviews.length; i++) {
    sum += parseInt(reviews[i].stars, 10) //don't forget to add the base
  }

  var avg = sum / reviews.length || 0

  return (
    <a href="/" style={{ cursor: 'default' }}>
      <div className="about-num-panel-info">
        <div className="icon-box icon-box-paint">
          <svg className="icon icon-rating">
            <use xlinkHref="#icon-rating" />
          </svg>
        </div>
        <div className="panel-num">{avg}</div>
      </div>
      <div className="about-num-panel-label">{`${reviews.length} ${
        reviews.length === 1 ? 'review' : 'reviews'
      }`}</div>
    </a>
  )
}

const rating = (rating) =>
  rating === (undefined || null)
    ? 'N/A'
    : rating > 70
    ? 'S++'
    : rating > 60
    ? 'S+'
    : rating > 50
    ? 'S'
    : rating > 40
    ? 'A'
    : rating > 30
    ? 'B'
    : rating > 20
    ? 'C'
    : 'D'

export default ({ book }) => (
  <div className="about-num-panel">
    {/* {book.reviews.length > 0 && <Stars reviews={book.reviews} />} */}
    <a style={{ cursor: 'default' }}>
      <div className="about-num-panel-info">
        <div className="icon-box">
          <svg className="icon icon-eye">
            <use xlinkHref="#icon-eye" />
          </svg>
        </div>
        <div className="panel-num">{book.views}</div>
      </div>
      <div className="about-num-panel-label">Views</div>
    </a>
    {/*
      <a href ="/">
      <div className="about-num-panel-info">
        <div className="icon-box">
          <svg className="icon icon-mark">
            <use xlinkHref="#icon-mark" />
          </svg>
        </div>
        <div className="panel-num">8.2k</div>
      </div>
      <div className="about-num-panel-label">Favorites</div>
    </a>
    */}
    <a style={{ cursor: 'default' }}>
      <div className="about-num-panel-info">
        <div className="icon-box">
          <svg className="icon icon-customers">
            <use xlinkHref="#icon-customers" />
          </svg>
        </div>
        <div className="panel-num">{book.readers.length}</div>
      </div>
      <div className="about-num-panel-label">Followers</div>
    </a>
    {book.rating && (
      <a style={{ cursor: 'default' }}>
        <div className="about-num-panel-info">
          <div className="icon-box icon-box-paint">
            <svg className="icon icon-rating">
              <use xlinkHref="#icon-rating" />
            </svg>
          </div>
          <div className="panel-num">{rating(book.rating)}</div>
        </div>
        <div className="about-num-panel-label">Avg rating</div>
      </a>
    )}
    {Boolean(book.rank) && book.rank <= 10 && (
      <a style={{ cursor: 'default' }}>
        <div className="about-num-panel-info">
          <div className="outline-box-rank">#{book.rank} TOP</div>
        </div>
        <div className="about-num-panel-label">Reward</div>
      </a>
    )}
  </div>
)
