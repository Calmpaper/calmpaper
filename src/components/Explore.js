import React, { useContext } from 'react'
import { UserContext, GetStreamContext } from 'context'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import {
  getLatestBooksQuery,
  addBookToFavoritesMutation,
  removeBookFromFavoritesMutation,
} from 'api'
import { getUserSlug } from 'helpers'

import BookCover from 'components/atoms/book-cover'
import Loader from 'components/Loader'
import Flex from 'components/Flex'

var regex = /(<([^>]+)>)/gi

const Book = ({ book, isFirst }) => {
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
      <BookCover book={book} isItem hideText />
      <div className="item-info" style={{ width: '100%' }}>
        <div className="item-head">
          <h3 className="item-title">{book.name}</h3>
          <div className="item-time">
            {book.author.username || book.author.fullname}
          </div>
        </div>
        <p className="item-text">
          {book.description.replace(/\s+/g, '').length > 400
            ? `${book.description.replace(regex, '').substring(0, 400)}...`
            : book.description}{' '}
        </p>
        <ul className="item-category">
          {book.tags.map((tag) => (
            <li>
              <a href>{tag.label}</a>
            </li>
          ))}
        </ul>
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
      </div>
    </div>
  )
}

export default () => {
  const [{ data: { books } = {}, fetching, error }] = useQuery({
    query: getLatestBooksQuery,
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="page-books-follows">
      <div className="latest">
        <div className="container">
          <div className="row">
            <h2 className="title size02">Find some great story</h2>
          </div>
          <div className="row" style={{ maxWidth: '750px', margin: 'auto' }}>
            {books
              .filter((book) => book.chapters.length > 0)
              .map((book, key) => (
                <Book book={book} key={book.id} isFirst={key === 0} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
