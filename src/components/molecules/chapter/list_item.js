import React from 'react'
import moment from 'moment'
import BookCover from 'components/atoms/book-cover'
import { getUserDisplayName, removeHtmlTags } from 'helpers'

export default ({ chapter }) => {
  return (
    <div className="item">
      <BookCover book={chapter.book} isItem />
      <div className="item-info" style={{ width: '100%' }}>
        <div className="item-head">
          <h3 className="item-title">
            {chapter.book.name} · <span>{chapter.title}</span>
          </h3>
          <div className="item-time">{`${getUserDisplayName(
            chapter.book.author,
          )}, ${moment(chapter.createdAt).fromNow()}`}</div>
        </div>
        <p className="item-text">{removeHtmlTags(chapter.content)}</p>
        <ul className="item-category">
          {chapter.book.tags.map((tag) => (
            <li key={tag.id}>
              <a href>{tag.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
