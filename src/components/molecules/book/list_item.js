import React, { useContext } from 'react'
import { UserContext, GetStreamContext } from 'context'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'urql'
import {
  addBookToFavoritesMutation,
  removeBookFromFavoritesMutation,
} from 'api'
import { getUserSlug, removeHtmlTags } from 'helpers'

import Rating from 'components/atoms/rating'
import BookCover from 'components/atoms/book-cover'

var regex = /(<([^>]+)>)/gi

export default ({ book, isFirst }) => {
  const { user } = useContext(UserContext)
  const { notificationsFeed } = useContext(GetStreamContext)
  const { push } = useHistory()
  const isFavorite =
    user && book.readers.find((reader) => reader.id === user.id)

  const [, addBookToFavorites] = useMutation(addBookToFavoritesMutation)
  const [, removeBookFromFavorites] = useMutation(
    removeBookFromFavoritesMutation,
  )

  const addToLibrary = () => {
    if (isFavorite) {
      removeBookFromFavorites({ userId: user.id, bookId: book.id })
      notificationsFeed.unfollow('book', book.id)
    } else {
      addBookToFavorites({ userId: user.id, bookId: book.id })
      notificationsFeed.follow('book', book.id)
    }
  }

  return (
    <div
      className="item item01"
      onClick={() => push(`/${getUserSlug(book.author)}/${book.slug}`)}
    >
      <BookCover book={book} isItem />
      <div className="item-info" style={{ width: '100%' }}>
        <div className="item-head">
          <h3 className="item-title">{book.name}</h3>
          <div className="item-time">
            {book.author.username || book.author.fullname}
          </div>
        </div>
        <p className="item-text">
          {book.description.replace(/\s+/g, '').length > 400
            ? removeHtmlTags(
                `${book.description.replace(regex, '').substring(0, 400)}...`,
              )
            : removeHtmlTags(book.description)}{' '}
        </p>
        <ul
          className="item-category about-num-panel"
          style={{ marginLeft: 0, marginTop: 0 }}
        >
          {book.tags.map((tag) => (
            <li>
              <a href style={{ marginRight: 0 }}>
                {tag.label}
              </a>
            </li>
          ))}
          {!!book.rating && (
            <a
              style={{ cursor: 'default', marginLeft: '4px', marginTop: '6px' }}
            >
              <Rating rating={book.rating} />
            </a>
          )}
        </ul>
        {/*
        <Flex row>
          <button className={`btn btn-follow`} onClick={addToLibrary}>
            {isFavorite ? 'Following' : 'Follow'}{' '}
            {!isFavorite && (
              <span>
                <svg className="icon icon-plus02">
                  <use xlinkHref="#icon-plus02" />
                </svg>
              </span>
            )}
          </button>
          {isFavorite && (
            <button
              className={`btn btn-follow active`}
              onClick={() =>
                push(`/${getUserSlug(book.author)}/${book.slug}/1`)
              }
              style={{ marginLeft: 8 }}
            >
              Read
            </button>
          )}
        </Flex>
        */}
      </div>
    </div>
  )
}
