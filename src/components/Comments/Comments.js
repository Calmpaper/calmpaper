import React from 'react'
import Input from './Input'
import Comment from './Comment'

export default ({
  comments = [],
  initialValue,
  onSubmit,
  placeholder,
  style,
  inputStyle,
}) => (
  <div className="comments">
    <div className="container">
      <div className="row">
        <div className="comments-count">{`Comments ${comments.length}`}</div>

        <Input
          initialValue={initialValue}
          onSubmit={onSubmit}
          placeholder={placeholder}
          style={style}
          inputStyle={inputStyle}
        />
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
      {/*
      <LoadMore />
      */}
    </div>
  </div>
)

// const LoadMore = () => (
//   <div className="row">
//     <button className="btn-more">Load more comments &gt;</button>
//   </div>
// )
