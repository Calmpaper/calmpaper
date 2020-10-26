import React, { useEffect, useRef } from 'react'
import { getUserDisplayName } from 'helpers'

export default ({
  book,
  isCatalog,
  isItem,
  isChapterPage = false,
  className: addClassName = '',
  size: bookCoverSize = '',
  style = {},
}) => {
  let className = 'about-book-main-img'
  if (isCatalog) {
    className = 'catalog-img'
  }

  if (isItem) {
    className = 'item-img'
  }

  const bookCoverRef = useRef()

  useEffect(() => {
    if (bookCoverRef.current) {
      const coverWidth = bookCoverRef.current.clientWidth

      // padding
      if (coverWidth < 100) {
        bookCoverRef.current.style.padding = '0 5px'
      }

      // title font size
      const titleNode = bookCoverRef.current.children[0]
      const coverTitleFont = (coverWidth / 100) * 20 - 2
      titleNode.style.fontSize = `${coverTitleFont}px`

      // author font size and bottom position
      const authorNode = bookCoverRef.current.children[1]
      if (authorNode) {
        let coverAuthorFont = (coverWidth / 100) * 8

        if (coverWidth < 100) {
          coverAuthorFont = (coverWidth / 100) * 10
          authorNode.style.lineHeight = '120%'
          authorNode.style.bottom = '6%'
        }

        if (coverWidth < 70) {
          authorNode.style.lineHeight = '120%'
          authorNode.style.bottom = '2%'
        }

        authorNode.style.fontSize = `${coverAuthorFont}px`
      }
    }
  }, [bookCoverRef])

  return book.image ? (
    <div
      className={`${className} ${addClassName}`}
      style={{
        background: `url("${book.image}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }}
    />
  ) : (
    <div
      className={`${className} book-cover ${bookCoverSize}`}
      ref={bookCoverRef}
      style={
        isChapterPage
          ? {
              background: `url('/img/book-cover.png' )`,
              backgroundSize: 'cover',
              borderRadius: 6,
            }
          : {
              background: `url('/img/book-cover.png' )`,
              backgroundSize: 'cover',
            }
      }
    >
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
      {book.author && (
        <div className="book-cover__author">{`by ${getUserDisplayName(
          book.author,
        )}`}</div>
      )}
    </div>
  )
}

// {chapter.book.image ? (
//   <div
//     className="book-cover follow-updates-card__cover follow-updates-card__cover_01"
//     style={{
//       backgroundImage: `url("${
//         chapter.book.image || '/img/book-cover.png'
//       }")`,
//       padding: '0px 5px',
//     }}
//   ></div>
// ) : (
//   <div
//     className="book-cover book-cover-size03"
//     style={{
//       backgroundImage: 'url("/img/book-cover.png")',
//       padding: '0px 5px',
//     }}
//   >
//     <div className="book-cover__title">{chapter.book.name}</div>
//     {chapter.book.author && (
//       <div className="book-cover__author">
//         by {getUserDisplayName(chapter.book.author)}
//       </div>
//     )}
//   </div>
// )}
