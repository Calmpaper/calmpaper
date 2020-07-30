import { useState, useContext } from 'react'
import moment from 'moment'
import { UserContext } from 'context'
import { useMutation } from 'urql'
import {
  editCommentMutation,
  sendCommentReplyMutation,
  setLikeMutation,
  removeLikeMutation,
} from 'api'

import * as atoms from 'components/atoms'
// import More from 'atomic/atoms/more'
// import Replies from '../Replies'

// // eslint-disable-next-line no-unused-vars
// const [__, deleteComment] = useMutation(deleteCommentMutation)
// const onDelete = () => deleteComment({ id: commentId })
// commentId,
// import More from './More'
// import Input from '../Input'

export const comment = ({ comment }) => {
  const { user } = useContext(UserContext)
  const [isEditing, setEditing] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)

  const [, editComment] = useMutation(editCommentMutation)
  const [, sendCommentReply] = useMutation(sendCommentReplyMutation)
  const [, setLike] = useMutation(setLikeMutation)
  const [, removeLike] = useMutation(removeLikeMutation)

  const onEdit = (value) => {
    editComment({ id: comment.id, body: value })
    setEditing(false)
  }

  const sendReply = (body) => {
    sendCommentReply({
      userId: parseInt(user.id),
      commentId: parseInt(comment.id),
      body,
    }).then(({ data: { updateOneComment: res = {} } = {} }) => {
      setShowReplies(true)
    })
  }

  const onLike = (like) => {
    if (!user) return

    if (like) {
      removeLike({ likeId: parseInt(like.id) })
    } else {
      setLike({ authorId: user.id, commentId: comment.id })
    }
  }

  return (
    <div className="comment-item">
      <div
        className="comment-avatar"
        style={{ backgroundImage: `url('${comment.author.avatar}')` }}
      />
      <div className="comment-info">
        {comment && isEditing ? (
          <Input
            initialValue={comment.body}
            showAvatar={false}
            onSubmit={onEdit}
            style={{ height: 48 }}
            autoFocus
          />
        ) : (
          <>
            <h4 className="comment-title">
              {comment.author.username || comment.author.fullname}{' '}
              <span>· {moment(comment.createdAt).fromNow()}</span>
            </h4>
            <div className="comment-text">
              <p>{comment.body}</p>
            </div>
          </>
        )}

        <div className="comment-footer__container">
          <div className="comment-footer__controls">
            {!comment.isChild && (
              <button
                className="comment-footer__reply-button"
                onClick={() => {
                  if (showReplyInput) {
                    setShowReplyInput(false)
                    setShowReplies(false)
                  } else {
                    setShowReplyInput(true)
                  }
                }}
                style={
                  showReplies && !showReplyInput
                    ? {
                        // color: '#4375fc',
                        opacity: 1,
                        // fontWeight: 500,
                        fontFamily: 'Inter',
                      }
                    : {
                        fontFamily: 'Inter',
                      }
                }
              >
                {showReplyInput ? 'Hide' : 'Reply'}
              </button>
            )}
            <div
              style={
                comment.isChild
                  ? { width: 0, marginLeft: -4 }
                  : { width: '12px' }
              }
            />
            <atoms.like
              likes={comment.likes}
              like={
                user && comment.likes.find((like) => like.author.id === user.id)
              }
              onLike={onLike}
            />
          </div>
          {/* user && user.id === comment.author.id && (
            <div className="comment-context-menu__container">
              <More commentId={comment.id} setEditing={setEditing} />
            </div>
              )*/}
        </div>
        {showReplyInput && (
          <Input
            onSubmit={sendReply}
            style={{ marginTop: 24, marginBottom: 40 }}
            autoFocus
          />
        )}
        {/* comment.replies && comment.replies.length > 0 && (
          <Replies
            showReplies={showReplies}
            setShowReplies={setShowReplies}
            replies={comment.replies}
            showReplyInput={showReplyInput}
          />
        )*/}
      </div>
    </div>
  )
}
