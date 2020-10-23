import React, { useEffect, useContext, useRef } from 'react'
import moment from 'moment'
import { UserContext } from 'context'
import { useHistory } from 'react-router-dom'
import { getUserDisplayName, getChapterPage, getUserSlug } from 'helpers'
import { useMutation } from 'urql'
import { setChapterLikeMutation, removeChapterLikeMutation } from 'api'

export default ({ chapter }) => {
  const { user } = useContext(UserContext)
  const { push } = useHistory()
  const actionsRef = useRef()

  const [, setLike] = useMutation(setChapterLikeMutation)
  const [, removeLike] = useMutation(removeChapterLikeMutation)

  // This crap is done for book cover resizing. Improve later
  useEffect(() => {
    const $ = window.$
    $(document).ready(function () {
      $('.book-cover').each(function (index, value) {
        var coverWidth = $(this).width()
        if (coverWidth < 100) {
          $(this).css('padding', '0 5px')
        }
      })

      $('.book-cover__title').each(function (index, value) {
        var coverWidth = $(this).parent().width()
        var coverFont = (coverWidth / 100) * 20
        $(this).css('font-size', coverFont)
        if (coverWidth < 100) {
          var coverFont = (coverWidth / 100) * 20
          $(this).css('font-size', coverFont)
        }
      })

      $('.book-cover__author').each(function (index, value) {
        var coverWidth = $(this).parent().width()
        var coverFont = (coverWidth / 100) * 8
        $(this).css('font-size', coverFont)
        if (coverWidth < 100) {
          var coverFont = (coverWidth / 100) * 10
          $(this).css('font-size', coverFont)
          $(this).css('bottom', '6%')
        }
        if (coverWidth < 70) {
          $(this).css('bottom', '2%')
        }
      })
    })
  })

  return (
    <div
      className="card-border follow-updates-card"
      onClick={(e) => {
        if (actionsRef.current.contains(e.target)) return

        // push(
        //   `/${getUserSlug(chapter.author)}/${
        //     chapter.book.slug
        //   }/${getChapterPage(chapter)}`,
        // )
      }}
    >
      {chapter.book.image ? (
        <div
          className="book-cover follow-updates-card__cover follow-updates-card__cover_01"
          style={{
            backgroundImage: `url("${
              chapter.book.image || '/img/book-cover.png'
            }")`,
            padding: '0px 5px',
          }}
        ></div>
      ) : (
        <div
          className="book-cover book-cover-size03"
          style={{
            backgroundImage: 'url("/img/book-cover.png")',
            padding: '0px 5px',
          }}
        >
          <div className="book-cover__title">{chapter.book.name}</div>
          {chapter.book.author && (
            <div className="book-cover__author">
              by {getUserDisplayName(chapter.book.author)}
            </div>
          )}
        </div>
      )}
      <div className="follow-updates-card__info" style={{ width: '100%' }}>
        <div className="follow-updates-card__head">
          <div
            className="follow-updates-card__title"
            style={{
              cursor: 'pointer',
            }}
            onClick={() =>
              push(
                `/${getUserSlug(chapter.author)}/${
                  chapter.book.slug
                }/${getChapterPage(chapter)}`,
              )
            }
          >
            {chapter.book.name}
          </div>
          <div
            className="follow-updates-card__author"
            style={{ cursor: 'pointer' }}
            onClick={() => push(`/${getUserSlug(chapter.author)}`)}
          >
            {`by ${getUserDisplayName(chapter.author)}`}
            <div
              className="follow-updates-card__avatar"
              style={{
                backgroundImage: `url("${chapter.author.avatar}")`,
              }}
            />
          </div>
        </div>
        <div className="follow-updates-card__date">
          {moment(chapter.createdAt).format('MMM DD, YYYY')} •{' '}
          <span
            onClick={() =>
              push(`/${getUserSlug(chapter.author)}/${chapter.book.slug}`)
            }
            style={{
              fontSize: 'inherit',
              lineHeight: 'inherit',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            {chapter.title}
          </span>
        </div>
        <p
          className="follow-updates-card__text"
          dangerouslySetInnerHTML={{
            __html: chapter.content
              .replace(/(?:\r\n|\r|\n)/g, '<br />')
              .split(' ')
              .splice(0, 140)
              .join(' '),
          }}
        />
        <div className="follow-updates-card__progress" ref={actionsRef}>
          <div
            className="follow-updates-card__progress-item"
            style={{ marginRight: 24 }}
            onClick={() =>
              push({
                pathname: `/${getUserSlug(chapter.author)}/${
                  chapter.book.slug
                }/${getChapterPage(chapter)}`,
                hash: 'comments',
              })
            }
          >
            <svg className="icon icon-comment03 clickable">
              <use xlinkHref="#icon-comment03" />
            </svg>
            {chapter.comments.length}
          </div>
          <div className="follow-updates-card__progress-item">
            {' '}
            {user &&
            chapter.likes.findIndex((like) => like.author.id === user.id) >
              -1 ? (
              <svg
                className="icon icon-like clickable"
                style={{ fill: 'red' }}
                onClick={() =>
                  removeLike({
                    chapterId: chapter.id,
                    likeId: chapter.likes.find(
                      (like) => like.author.id === user.id,
                    ).id,
                  })
                }
              >
                <use xlinkHref="#icon-like02" />
              </svg>
            ) : (
              <svg
                className="icon icon-like03 clickable"
                onClick={() =>
                  setLike({
                    userId: user.id,
                    chapterId: chapter.id,
                  })
                }
              >
                <use xlinkHref="#icon-like03" />
              </svg>
            )}
            {chapter.likes.length}
          </div>
        </div>
      </div>
    </div>
  )
}
