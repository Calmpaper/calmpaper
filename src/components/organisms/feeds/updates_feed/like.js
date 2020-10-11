import React from 'react'
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom'
import { getUserSlug, getUserDisplayName, getChapterPage } from 'helpers'

export default ({ like }) => {
  const { push } = useHistory()
  const bookSlug = like.chapter.book.slug
  console.log('like')
  console.log(like)
  console.log(like.chapter.book)

  if (!like) return null

  return (
    <div className="follow-updates-comments__item">
      <div
        className="follow-updates-comments__avatar clickable"
        style={{
          backgroundImage: `url(${like.author.avatar})`,
          borderRadius: '100%',
        }}
        onClick={() => push(`/${getUserSlug(like.author)}`)}
      />
      <div>
        <div className="follow-updates-comments__info">
          {getUserSlug(like.author)} liked on{' '}
          <Link
            to={`/${getUserSlug(
              like.chapter.book.author,
            )}/${bookSlug}/${getChapterPage(like.chapter)}`}
          >
            {like.chapter.title}
          </Link>
          <span>{moment(like.createdAt).fromNow()}</span>
        </div>
        <div
          className="follow-updates-comments__name clickable"
          onClick={() => push(`/${getUserSlug(like.author)}`)}
        >
          {getUserDisplayName(like.author)}
        </div>
        <div className="follow-updates-comments__text">
          Liked your book.{' '}
          <svg className="icon icon-like">
            <use xlinkHref="#icon-like02" />
          </svg>
        </div>
      </div>
    </div>
  )
}
