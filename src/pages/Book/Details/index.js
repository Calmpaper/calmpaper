import React from 'react'

import Description from './Description'
import Tags from './Tags'
import Genres from './Genres'
import TableOfContent from './TableOfContent'
import Actions from '../Actions'

export default ({ book }) => (
  <>
    <Description description={book.description} />
    <Genres genres={book.genres} />
    <Tags tags={book.tags} />
    {book.chapters.length > 0 && (
      <TableOfContent chapters={book.chapters} bookId={book.id} />
    )}
  </>
)
