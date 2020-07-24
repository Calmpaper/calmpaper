import React from 'react'

import Author from './Author'
import MoreByAuthor from './MoreByAuthor'

export default ({ author }) => (
  <div className="col-sidebar">
    <div className="items">
      <Author author={author} />
      <MoreByAuthor books={author.books} />
    </div>
  </div>
)
