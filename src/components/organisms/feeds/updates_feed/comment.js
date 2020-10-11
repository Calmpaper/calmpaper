import React from 'react'
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom'
import { getUserSlug, getUserDisplayName, getChapterPage } from 'helpers'

export default ({ comment }) => {
  const { push } = useHistory()
  const bookSlug = comment.chapter.book.slug

  return (
    <div className="follow-updates-comments__item">
      <div
        className="follow-updates-comments__avatar clickable"
        style={{
          backgroundImage: `url(${comment.author.avatar})`,
          borderRadius: '100%',
        }}
        onClick={() => push(`/${getUserSlug(comment.author)}`)}
      />
      <div>
        <div className="follow-updates-comments__info">
          {getUserSlug(comment.author)} commented on{' '}
          <Link
            to={`/${getUserSlug(
              comment.chapter.author,
            )}/${bookSlug}/${getChapterPage(comment.chapter)}`}
          >
            {comment.chapter.title}
          </Link>
          <span>{moment(comment.createdAt).fromNow()}</span>
        </div>
        <div
          className="follow-updates-comments__name clickable"
          onClick={() => push(`/${getUserSlug(comment.author)}`)}
        >
          {getUserDisplayName(comment.author)}
        </div>
        <div className="follow-updates-comments__text">{comment.body}</div>
      </div>
    </div>
  )
}
