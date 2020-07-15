import React, { useState, useContext } from 'react'
import moment from 'moment'
import { UserContext, GetStreamContext } from 'context'
import { useParams } from 'react-router-dom'
import { useMutation } from 'urql'
import {
  editCommentMutation,
  sendCommentReplyMutation,
  setLikeMutation,
  removeLikeMutation,
} from 'api'

import Likes from './Likes'
import Replies from '../Replies'
import More from './More'
import Input from '../Input'

const Comment = ({ comment }) => {
  const { book: bookId, chapter: chapterId } = useParams()
  const { user } = useContext(UserContext)
  const { userFeed, addActivity } = useContext(GetStreamContext)
  const [isEditing, setEditing] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [_, editComment] = useMutation(editCommentMutation)

  // eslint-disable-next-line no-unused-vars
  const [__, sendCommentReply] = useMutation(sendCommentReplyMutation)

  // eslint-disable-next-line no-unused-vars
  const [___, setLike] = useMutation(setLikeMutation)

  // eslint-disable-next-line no-unused-vars
  const [____, removeLike] = useMutation(removeLikeMutation)

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

  const like = user && comment.likes.find((like) => like.author.id === user.id)
  const onLike = () => {
    if (like) {
      removeLike({
        likeId: parseInt(like.id),
      })
      userFeed.removeActivity({ foreignId: `like:${like.id}` })
    } else {
      setLike({
        authorId: user.id,
        commentId: comment.id,
      }).then(({ data: { setCommentLike: res = {} } = {} }) => {
        console.log(res)
      })
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
              {comment.author.fullname}{' '}
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
            <Likes likes={comment.likes} onLike={onLike} isLiked={!!like} />
          </div>
          {user && user.id === comment.author.id && (
            <div className="comment-context-menu__container">
              <More commentId={comment.id} setEditing={setEditing} />
            </div>
          )}
        </div>
        {showReplyInput && (
          <Input
            onSubmit={sendReply}
            style={{ marginTop: 24, marginBottom: 40 }}
            autoFocus
          />
        )}
        {comment.replies && comment.replies.length > 0 && (
          <Replies
            showReplies={showReplies}
            setShowReplies={setShowReplies}
            replies={comment.replies}
            showReplyInput={showReplyInput}
          />
        )}
      </div>
    </div>
  )
}
export default Comment
