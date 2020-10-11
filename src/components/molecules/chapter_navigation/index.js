import React, { useContext } from 'react'
import { UserContext } from 'context'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'urql'
import { setChapterLike, removeLikeMutation } from 'api'
import { getUserSlug } from 'helpers'

export default ({ chapter, reexecuteQuery }) => {
  const currentPage =
    chapter.book.chapters.findIndex((c) => c.id === chapter.id) + 1
  const pagesCount = chapter.book.chapters.length
  const { push } = useHistory()
  const { user } = useContext(UserContext)

  const onComment = () => {
    document.getElementById('comments-section').scrollIntoView()
  }

  const [, setLike] = useMutation(setChapterLike)
  const [, removeLike] = useMutation(removeLikeMutation)

  const like = user && chapter.likes.find((like) => like.author.id === user.id)
  const isLiked = !!like

  const onLike = () => {
    if (!user) return null

    if (like) {
      removeLike({
        likeId: parseInt(like.id),
      }).then((r) => reexecuteQuery())
    } else {
      setLike({
        authorId: user.id,
        chapterId: chapter.id,
      }).then((r) => reexecuteQuery())
    }
  }

  const toNextChapter = () => {
    push(
      `/${getUserSlug(chapter.book.author)}/${chapter.book.slug}/${
        currentPage + 1
      }`,
    )
  }

  const toPreviousChapter = () => {
    push(
      `/${getUserSlug(chapter.book.author)}/${chapter.book.slug}/${
        currentPage - 1
      }`,
    )
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === pagesCount
  const isOnlyPage = pagesCount === 1

  return (
    <div className="page-widgets in">
      <div className="widget-page-menu">
        <div className="container" style={{ minHeight: 40 }}>
          {!isOnlyPage && (
            <button
              className={`widget-page-menu__btn-nav btn-prev ${
                isFirstPage ? 'disabled' : ''
              }`}
              style={isFirstPage ? { cursor: 'disabled' } : {}}
              onClick={!isFirstPage && toPreviousChapter}
            >
              Previous
            </button>
          )}

          <button className="widget-btn" onClick={onLike}>
            <svg
              className="icon icon-like"
              style={isLiked ? { fill: 'red' } : {}}
            >
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
          <button className="widget-btn">
            <svg className="icon icon-setting">
              <use xlinkHref="#icon-setting" />
            </svg>
          </button>
          */}
          {!isOnlyPage && (
            <button
              className={`widget-page-menu__btn-nav btn-next ${
                isLastPage ? 'disabled' : ''
              }`}
              style={isLastPage ? { cursor: 'disabled' } : {}}
              onClick={!isLastPage && toNextChapter}
            >
              Next page
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
