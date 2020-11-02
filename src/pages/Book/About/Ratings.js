import React from 'react'
import { transformRating } from 'helpers'

import 'assets/css/about.css'

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
        <div className="panel-num">{book.totalViews}</div>
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
    <a style={{ cursor: 'default' }}>
      <div className="about-num-panel-info">
        <div className="icon-box icon-box-paint">
          <svg className="icon icon-rating">
            <use xlinkHref="#icon-rating" />
          </svg>
        </div>
        <div className="panel-num">{transformRating(book.rating)}</div>
      </div>
      <div className="about-num-panel-label">Avg rating</div>
    </a>
    {!!book.rank && book.rank <= 10 && (
      <a style={{ cursor: 'default' }}>
        <div className="about-num-panel-info">
          <div className="outline-box-rank">#{book.rank} TOP</div>
        </div>
        <div className="about-num-panel-label">Rank</div>
      </a>
    )}
  </div>
)
