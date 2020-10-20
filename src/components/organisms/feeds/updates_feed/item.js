import React from 'react'
import { useQuery } from 'urql'
import { getCommentsByChapter, getLikesByChapter } from 'api'

import Loader from 'components/Loader'
import Chapter from './chapter'
import Comment from './comment'
import Like from './like'

export default ({ chapter }) => {
  // 1) Fetch comments
  const [
    {
      data: { commentsByChapter: comments = [] } = {},
      fetching: commentsFetching,
      error: commentsError,
    },
  ] = useQuery({
    query: getCommentsByChapter,
    variables: {
      chapterId: chapter.id,
    },
  })

  // 2) Fetch likes
  const [
    {
      data: { likesByChapter: likes = [] } = {},
      fetching: likesFetching,
      error: likesError,
    },
  ] = useQuery({
    query: getLikesByChapter,
    variables: {
      chapterId: chapter.id,
    },
  })

  // 3) Merge
  const activityFeed = comments
    .concat(likes)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  if (commentsError) return <p>Oh no... {commentsError.message}</p>
  if (likesError) return <p>Oh no... {likesError.message}</p>

  if (!chapter.book) return null

  return (
    <div className="follow-updates-item">
      <Chapter chapter={chapter} />
      <div className="follow-updates-comments">
        {commentsFetching || likesFetching ? (
          <Loader />
        ) : (
          <>
            {activityFeed.map((i) => {
              if (i.__typename === 'Like') {
                return <Like like={i} key={i.id} />
              } else if (i.__typename === 'Comment') {
                return <Comment comment={i} key={i.id} />
              }
              return null
            })}
          </>
        )}
      </div>
    </div>
  )
}
