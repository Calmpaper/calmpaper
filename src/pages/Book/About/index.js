import React, { useContext, useState } from 'react'
import { UserContext, GetStreamContext } from 'context'
import { useHistory, Link } from 'react-router-dom'
import { useMutation } from 'urql'
import {
  addBookToFavoritesMutation,
  removeBookFromFavoritesMutation,
} from 'api'
import { getUserSlug, getUserDisplayName } from 'helpers'
import BookCover from 'components/atoms/book-cover'
import Ratings from './Ratings'
// import Reward from 'react-rewards'

export default ({ book }) => {
  // const [ref, setRef] = useState()
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
      // ref && ref.rewardMe()
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
            onClick={() => push(`/${getUserSlug(book.author)}`)}
          >{`by ${getUserDisplayName(book.author)}`}</p>
        )}
        <Ratings book={book} />
        <div className="about-book-main-btn">
          {book.chapters.length > 0 ? (
            <Link
              to={`/${getUserSlug(book.author)}/${book.slug}/1`}
              className="btn btn-color"
            >
              Read now
            </Link>
          ) : (
            user &&
            book.author.id === user.id && (
              <Link
                to={`/${getUserSlug(book.author)}/${book.slug}/new-page`}
                className="btn btn-color"
                style={{ width: 140, marginRight: 8 }}
              >
                Add first page
              </Link>
            )
          )}

          <button
            className="btn btn-grey"
            onClick={addToLibrary}
            style={book.chapters.length === 0 ? { marginLeft: 0 } : {}}
          >
            {isFavorite ? `Remove` : `Follow`}
            {/*
            <span className="icon-dropdown">
              <svg className="icon icon-arrow-down">
                <use xlinkHref="#icon-arrow-down" />
              </svg>
            </span>
            */}
          </button>
        </div>
      </div>

      <div className="col col-img">
        <BookCover book={book} />
      </div>
    </div>
  )
}
