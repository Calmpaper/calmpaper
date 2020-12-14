import React from 'react'
import { Link } from 'react-router-dom'
import { getUserSlug, transformRating } from 'helpers'
import BookCover from 'components/atoms/book-cover'

export default ({ books = [] }) => {
  if (books.length === 0) return null
  return (
    <div className="sidebar-box sidebar-catalog">
      <h4 className="title size04">More by author</h4>
      {books.map((book) => (
        <Link to={`/${getUserSlug(book.author)}/${book.slug}`} key={book.id}>
          <BookCover book={book} isCatalog hideText />
          <div className="catalog-info">
            <h3 className="catalog-title">{book.name}</h3>
            <p className="catalog-author">{book.author.username}</p>
            {/*
              <div className="progress">
                <div className="progress__line">
                  <span
                    className="progress__stat"
                    style={{ width: `${avg * 10}%` }}
                  />
                </div>
                <div className="progress__num">{`${avg * 10}%`}</div>
              </div>
              */}
            {/*
            <div className="catalog-stat" style={{ marginTop: 8 }}>
              <div className="catalog-stat__box">
                <svg className="icon icon-rating">
                  <use xlinkHref="#icon-rating" />
                </svg>

                <span>{transformRating(book.rating)}</span>
              </div>
              <div className="catalog-stat__box">
                <svg className="icon icon-eye">
                  <use xlinkHref="#icon-eye" />
                </svg>
                <span>{book.views}</span>
              </div>
            </div>
            */}
          </div>
        </Link>
      ))}
    </div>
  )
}
