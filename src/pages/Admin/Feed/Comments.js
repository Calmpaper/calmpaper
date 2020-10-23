import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useQuery } from 'urql'
import { getAllCommentsQuery } from 'api'
import { getUserDisplayName, getUserSlug, getChapterPage } from 'helpers'

import Loader from 'components/Loader'

const Comment = ({ comment, isFirst, isLast }) => {
  if (!comment.chapter && !comment.book) return null
  if (comment.chapter && !comment.chapter.book) return null
  return (
    <div className={`block ${isFirst ? 'first' : ''} ${isLast ? 'last' : ''}`}>
      <div
        className="block-avatar"
        style={{ backgroundImage: `url("${comment.author.avatar}")` }}
      />
      <div className="block-info">
        <div className="block-head">
          <div className="block-name">{getUserDisplayName(comment.author)}</div>
          <div className="block-date">
            {moment(comment.createdAt).fromNow()}
          </div>
        </div>
        <div className="block-comment">
          {`Commented on ${comment.chapter ? 'chapter' : 'book'} `}
          {comment.chapter ? (
            <Link
              className="clickable"
              to={`/${getUserSlug(comment.chapter.author)}/${
                comment.chapter.book
                  ? comment.chapter.book.slug
                  : comment.book.slug
              }/${getChapterPage(comment.chapter)}`}
            >
              {`${comment.chapter.title}: ${comment.chapter.book.name}`}
            </Link>
          ) : (
            <Link
              className="clickable"
              to={`/${getUserSlug(comment.book.author)}/${comment.book.slug}`}
            >
              {`${comment.book.name}`}
            </Link>
          )}
        </div>
        <div className="block-text">{comment.body}</div>
      </div>
    </div>
  )
}

export default () => {
  const [{ data: { comments = [] } = {}, fetching, error }] = useQuery({
    query: getAllCommentsQuery,
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="latest page-profile03" style={{ marginTop: 25 }}>
      <div className="container" style={{ padding: 0 }}>
        <div className="row">
          <div className="tab-item tab-activity in">
            {comments.map((comment, index) => {
              const isFirst = index === 0
              const isLast = index === comments.length - 1
              return (
                <Comment
                  comment={comment}
                  key={comment.id}
                  isFirst={isFirst}
                  isLast={isLast}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
