import React from 'react'

const Thumb = ({ like, onLike }) => {
  const isLiked = !!like

  return (
    <button
      className={`comment-like__button ${isLiked ? '_active' : ''}`}
      onClick={() => onLike(like)}
    >
      <svg
        className={`comment-like__icon ${isLiked ? '_to_active' : ''}`}
        viewBox="0 0 18 18"
      >
        <use xlinkHref="#like--inline" />
      </svg>
    </button>
  )
}

const Count = ({ likes }) => (
  <span className="comment-likes-info__wrapper">
    {likes.length > 0 && (
      <button className="comment-likes-info__button _is-positive">
        {likes.length}
      </button>
    )}
  </span>
)

export const like = ({ likes, like, onLike }) => {
  return (
    <div className="comment-footer__controls-likes">
      <Thumb like={like} onLike={onLike} />
      <Count likes={likes} />
    </div>
  )
}
