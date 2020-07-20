import React from 'react'
import { useHistory } from 'react-router-dom'

export default ({ chapter }) => {
  const currentPage =
    chapter.book.chapters.findIndex((c) => c.id === chapter.id) + 1
  const pagesCount = chapter.book.chapters.length
  const { push } = useHistory()

  const onComment = () => {}

  const onLike = () => {}

  const onSettings = () => {}

  const toNextChapter = () => {
    push(`/books/${chapter.book.id}/${currentPage + 1}`)
  }

  const toPreviousChapter = () => {
    push(`/books/${chapter.book.id}/${currentPage - 1}`)
  }

  return (
    <div className="widget-page-menu in">
      <div className="container" style={{ width: 'auto' }}>
        {currentPage !== 1 && (
          <button
            className="widget-page-menu__btn-nav btn-prev disabled"
            onClick={toPreviousChapter}
          >
            Previous
          </button>
        )}
        <button className="widget-btn" onClick={onLike}>
          <svg className="icon icon-like">
            <use xlinkHref="#icon-like" />
          </svg>
        </button>
        <button className="widget-btn" onClick={onComment}>
          <svg className="icon icon-comments">
            <use xlinkHref="#icon-comments" />
          </svg>
        </button>
        {/*
        <button className="widget-btn">
          <svg className="icon icon-list">
            <use xlinkHref="#icon-list" />
          </svg>
        </button>
        */}
        <button className="widget-btn" onClick={onSettings}>
          <svg className="icon icon-setting">
            <use xlinkHref="#icon-setting" />
          </svg>
        </button>

        {currentPage !== pagesCount && (
          <button
            className="widget-page-menu__btn-nav btn-next"
            onClick={toNextChapter}
          >
            Next page
          </button>
        )}
      </div>
    </div>
  )
}
