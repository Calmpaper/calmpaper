import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useQuery } from 'urql'
import { getAllCommentsQuery } from 'api'
import { getUserDisplayName, getUserSlug, getChapterPage } from 'helpers'

import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'components/Loader'
import Flex from 'components/atoms/flex'

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
  const [page, setPage] = useState(0)
  const [refetch, setRefetch] = useState(false)
  const [
    { data: { comments = [], commentsCount } = {}, fetching, error },
  ] = useQuery({
    query: getAllCommentsQuery,
    variables: {
      first: 5 * (page + 1),
    },
  })

  useEffect(() => {
    setRefetch(true)
  }, [comments])

  if (fetching && !refetch) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="latest page-profile03" style={{ marginTop: 25 }}>
      <div className="container" style={{ padding: 0 }}>
        <div
          className="row"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className="tab-item tab-activity in" style={{ width: 750 }}>
            <InfiniteScroll
              dataLength={comments.length}
              next={() => setPage(page + 1)}
              hasMore={comments.length !== commentsCount}
              style={{ paddingTop: 10, marginTop: -10 }}
              loader={
                <Flex
                  justifyCenter
                  alignCenter
                  style={{
                    width: '100%',
                    height: '100px',
                  }}
                >
                  <Loader />
                </Flex>
              }
            >
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
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  )
}
