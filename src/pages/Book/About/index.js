import React, { useContext } from 'react'
import { UserContext, GetStreamContext } from 'context'
import { useHistory, Link } from 'react-router-dom'
import { useMutation } from 'urql'
import {
  addBookToFavoritesMutation,
  removeBookFromFavoritesMutation,
} from 'api'
import Ratings from './Ratings'

export default ({ book }) => {
  const { user } = useContext(UserContext)
  const { notificationsFeed } = useContext(GetStreamContext)
  const { push } = useHistory()
  const isFavorite =
    user && book.readers.find((reader) => reader.id === user.id)

  // eslint-disable-next-line no-unused-vars
  const [_, addBookToFavorites] = useMutation(addBookToFavoritesMutation)

  // eslint-disable-next-line no-unused-vars
  const [__, removeBookFromFavorites] = useMutation(
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
    <div className="about-book-main">
      <div className="col col-info">
        <h1 className="title size01">{book.name}</h1>
        {/*
        <div>edit</div>
        <div>delete</div>
        */}
        {book.author && (
          <p
            className="about-book-author"
            onClick={() =>
              push(
                `/users/${
                  book.author.username
                    ? `@${book.author.username}`
                    : book.author.id
                }`,
              )
            }
          >{`by ${book.author.username || book.author.fullname}`}</p>
        )}
        <Ratings book={book} />
        <div className="about-book-main-btn">
          {book.chapters.length > 0 && (
            <Link to={`/books/${book.id}/1`} className="btn btn-color">
              Read now
            </Link>
          )}
          <button
            className="btn btn-grey"
            onClick={addToLibrary}
            style={book.chapters.length === 0 ? { marginLeft: 0 } : {}}
          >
            {isFavorite ? `Remove` : `Follow`}

            <span className="icon-dropdown">
              <svg className="icon icon-arrow-down">
                <use xlinkHref="#icon-arrow-down" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="col col-img">
        <div
          className="about-book-main-img"
          style={{
            background: `url("${book.image || '/img/placeholder.jpg'}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
    </div>
  )
}
