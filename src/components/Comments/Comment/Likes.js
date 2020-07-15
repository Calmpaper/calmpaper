import React, { useContext } from 'react'
import { UserContext } from 'context'

export default ({ likes, isLiked, onLike }) => {
  const { user } = useContext(UserContext)

  return (
    <div className="comment-footer__controls-likes">
      <button
        className={`comment-like__button ${isLiked ? '_active' : ''}`}
        onClick={() => user && onLike()}
      >
        <svg
          className={`comment-like__icon ${isLiked ? '_to_active' : ''}`}
          viewBox="0 0 18 18"
        >
          <use xlinkHref="#like--inline" />
        </svg>
      </button>
      <span className="comment-likes-info__wrapper">
        {likes.length > 0 && (
          <button className="comment-likes-info__button _is-positive">
            {likes.length}
          </button>
        )}
      </span>
    </div>
  )
}
