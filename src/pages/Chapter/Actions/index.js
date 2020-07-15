import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { useMutation } from 'urql'
import { setChapterLike, removeLikeMutation } from 'api'
import MoreMenu from './More'

export default ({ chapter }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { user } = useContext(UserContext)

  // eslint-disable-next-line no-unused-vars
  const [_, setLike] = useMutation(setChapterLike)

  // eslint-disable-next-line no-unused-vars
  const [__, removeLike] = useMutation(removeLikeMutation)

  const like = user && chapter.likes.find((like) => like.author.id === user.id)
  const isLiked = !!like
  const onLike = () => {
    if (like) {
      removeLike({
        likeId: parseInt(like.id),
      })
    } else {
      setLike({
        authorId: user.id,
        chapterId: chapter.id,
      }).then(({ data: { setCommentLike: res = {} } = {} }) => {
        console.log(res)
      })
    }
  }

  return (
    <div className="read-book-text">
      <div className="container">
        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
          <button
            className={`comment-like__button ${isLiked ? '_active' : ''}`}
            onClick={() => {}}
            style={{ marginRight: 8 }}
            onClick={onLike}
          >
            <svg
              className={`comment-like__icon ${isLiked ? '_to_active' : ''}`}
              viewBox="0 0 18 18"
              style={{ width: 24, height: 24 }}
            >
              <use xlinkHref="#like--inline" />
            </svg>
          </button>
          {chapter.likes.length > 0 && (
            <span style={{ marginRight: 12 }}>{chapter.likes.length}</span>
          )}

          <button
            className="comment-context-menu__button"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              color: '#4375fc',
              opacity: 1,
            }}
          >
            <svg
              viewBox="0 0 18 18"
              className="comment-context-menu__icon"
              style={{ width: 24, height: 24 }}
            >
              <use xlinkHref="#dots-s--inline" />
            </svg>
          </button>

          {showDropdown && (
            <MoreMenu
              bookId={chapter.book.id}
              chapterId={chapter.id}
              chapter={chapter}
              hide={() => setShowDropdown(false)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
