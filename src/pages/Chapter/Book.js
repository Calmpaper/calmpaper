import React from 'react'
import { useHistory } from 'react-router-dom'
import { getUserSlug, getUserDisplayName } from 'helpers'
import BookCover from 'components/atoms/book-cover'
import Ratings from './Ratings'

export default ({ chapter }) => {
  const book = chapter.book
  const { push } = useHistory()

  return (
    <div className="read-book-main">
      <div className="container">
        <div className="col col01">
          <h1 className="title size01">{chapter.book.name}</h1>
          <div
            className="author clickable"
            onClick={() => push(`/${getUserSlug(book.author)}`)}
          >
            {getUserDisplayName(book.author)}
          </div>
          <Ratings chapter={chapter} />
        </div>
        <div className="col col02">
          <BookCover
            book={book}
            isChapterPage
            size="book-cover-size01"
            style={{
              maxWidth: '180px',
              boxShadow: '0px 30px 30px rgba(44, 26, 22, 0.2)',
              height: '250px',
              width: '180px',
              borderRadius: '6px',
            }}
          />
        </div>
      </div>
    </div>
  )
}
