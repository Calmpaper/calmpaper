import React, { useContext } from 'react'
import { UserContext } from 'context'
import Link from 'next/link'
import { useMutation } from 'urql'
import {
  addBookToFavoritesMutation,
  removeBookFromFavoritesMutation,
} from 'api'
// import Ratings from './Ratings'

export const about = ({ book }) => {
  const { user } = useContext(UserContext)
  // const { notificationsFeed } = useContext(GetStreamContext)
  const isFavorite =
    user && book.readers.find((reader) => reader.id === user.id)

  const [_, addBookToFavorites] = useMutation(addBookToFavoritesMutation)
  const [, removeBookFromFavorites] = useMutation(
    removeBookFromFavoritesMutation,
  )

  const addToLibrary = () => {
    if (isFavorite) {
      removeBookFromFavorites({ userId: user.id, bookId: book.id })
      // notificationsFeed.unfollow('book', book.id)
    } else {
      addBookToFavorites({ userId: user.id, bookId: book.id })
      // notificationsFeed.follow('book', book.id)
    }
  }

  return (
    <div className="about-book-main">
      <div className="col col-info">
        <h1 className="title size01">{book.name}</h1>
        {/*
        <div>edit</div>
        <div>delete</div>
        onClick={() => push(`/users/${book.author.id}`)}
        */}
        {book.author && (
          <p className="about-book-author">{`by ${
            book.author.username || book.author.fullname
          }`}</p>
        )}
        {/*
        <Ratings book={book} />
        */}
        <div className="about-book-main-btn">
          {book.chapters.length > 0 && (
            <Link href={`/books/[book]/[chapter]`} as={`/books/${book.id}/1`}>
              <a className="btn btn-color">Read book</a>
            </Link>
          )}
          <button
            className="btn btn-grey"
            onClick={addToLibrary}
            style={book.chapters.length === 0 ? { marginLeft: 0 } : {}}
          >
            {isFavorite ? `Remove` : `Add to Library`}
          </button>
        </div>
      </div>
      <div className="col col-img">
        <div
          className="about-book-main-img"
          style={{
            background: `url('${book.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
    </div>
  )
}
