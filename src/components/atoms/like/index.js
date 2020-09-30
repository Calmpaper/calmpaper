import React, { useState } from 'react'

const Thumb = ({ isLiked, onLike }) => {
  return (
    <button
      className={`comment-like__button ${isLiked ? '_active' : ''}`}
      onClick={onLike}
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

const Count = ({ count }) => (
  <span className="comment-likes-info__wrapper">
    {count > 0 && (
      <button className="comment-likes-info__button _is-positive">
        {count}
      </button>
    )}
  </span>
)

export default ({ likes, like, onLike }) => {
  const [isLiked, setLiked] = useState(!!like)
  const [count, setCount] = useState(likes.length)
  const [touched, setTouched] = useState(false)

  return (
    <div className="comment-footer__controls-likes">
      <Thumb
        isLiked={isLiked}
        onLike={() => {
          setLiked(!isLiked)

          if (!touched) {
            onLike(like)
            if (isLiked) {
              setCount((count) => count - 1)
            } else {
              setCount((count) => count + 1)
            }
            setTouched(true)
          }
        }}
      />
      <Count count={count} />
    </div>
  )
}
