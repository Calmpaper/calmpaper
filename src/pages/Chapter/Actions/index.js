import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { useMutation } from 'urql'
import { setChapterLike, removeLikeMutation } from 'api'
import Like from 'atomic/atoms/like'
import MoreMenu from './More'

export default ({ chapter }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { user } = useContext(UserContext)

  const [, setLike] = useMutation(setChapterLike)
  const [, removeLike] = useMutation(removeLikeMutation)

  const onLike = (like) => {
    if (!user) return null

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
          <Like
            likes={chapter.likes}
            like={
              user && chapter.likes.find((like) => like.author.id === user.id)
            }
            onLike={onLike}
          />

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
