import React from 'react'

export default ({
  book,
  isCatalog,
  isItem,
  hideText = false,
  isChapterPage = false,
}) => {
  let className = 'about-book-main-img'
  if (isCatalog) {
    className = 'catalog-img'
  }

  if (isItem) {
    className = 'item-img'
  }

  return book.image ? (
    <div
      className={className}
      style={{
        background: `url("${book.image}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  ) : (
    <div
      className={`${className} book-cover`}
      style={
        isChapterPage
          ? {
              width: '250px',
              margin: 'auto',
              height: '350px',
              background: `url('/img/book-cover.png' )`,
              backgroundSize: 'cover',
            }
          : {
              background: `url('/img/book-cover.png' )`,
              backgroundSize: 'cover',
            }
      }
    >
      {!hideText && (
        <div
          className="book-cover__title"
          style={
            isCatalog
              ? {
                  position: 'absolute',
                  top: 'calc(50% - 20px)',
                }
              : {}
          }
        >
          {book.name}
        </div>
      )}
      {!hideText && book.author && (
        <div className="book-cover__author">{`by ${
          book.author.username || book.author.fullname
        }`}</div>
      )}
    </div>
  )
}
