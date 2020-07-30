// import Input from './Input'
import * as molecules from 'components/molecules'

export const comments = ({
  comments = [],
  initialValue,
  onSubmit,
  placeholder,
  style,
  inputStyle,
}) => (
  <div className="comments" id="comments-section">
    <div className="container">
      <div className="row">
        <div className="comments-count">{`Comments ${comments.length}`}</div>

        {/*
        <Input
          initialValue={initialValue}
          onSubmit={onSubmit}
          placeholder={placeholder}
          style={style}
          inputStyle={inputStyle}
        />
        */}
        {comments.map((comment) => (
          <molecules.comment comment={comment} key={comment.id} />
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
