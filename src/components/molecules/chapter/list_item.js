import React from 'react'
import moment from 'moment'
import { getUserDisplayName } from 'helpers'

export default ({ chapter }) => {
  return (
    <div className="item" style={{ width: '100%' }}>
      <div
        className="item-img"
        style={{ backgroundImage: `url("${chapter.book.image}")` }}
      />
      <div className="item-info">
        <div className="item-head">
          <h3 className="item-title">
            {chapter.book.name} · <span>{chapter.title}</span>
          </h3>
          <div className="item-time">{`${getUserDisplayName}, ${moment(
            chapter.createdAt,
          ).fromNow()}`}</div>
        </div>
        <p className="item-text">{chapter.content}</p>
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
