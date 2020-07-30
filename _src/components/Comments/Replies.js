import React from 'react'
import Comment from './Comment'

export default ({
  replies = [],
  showReplies,
  setShowReplies,
  showReplyInput,
}) => {
  return (
    <div>
      {(!showReplyInput || (showReplyInput && !showReplies)) && !showReplies && (
        <button
          className="comment-more-button _child"
          onClick={() => setShowReplies(!showReplies)}
        >
          <svg
            viewBox="0 0 18 18"
            className="comment-more-button__icon"
            style={{
              stroke: '#555555',
              height: 16,
              marginRight: 4,
              opacity: 0.8,
              marginTop: 6,
            }}
          >
            <use xlinkHref="#down-right-s--inline" />
          </svg>
          <span
            style={{
              fontSize: 13,
              lineHeight: '26px',
              display: 'inline-block',
              position: 'absolute',
              marginTop: 2,
            }}
          >{`${replies.length} replies`}</span>
        </button>
      )}
      {showReplies && (
        <div style={{ marginTop: 40, marginBottom: -28 }}>
          {replies.map((reply) => (
            <Comment comment={reply} key={reply.id} />
          ))}
        </div>
      )}
    </div>
  )
}
