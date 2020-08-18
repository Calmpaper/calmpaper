import React from 'react'
import { useQuery } from 'urql'
import { getBooksQuery } from 'api'

import Loader from 'components/Loader'
import Book from './Book'

export default ({ sort, style = {} }) => {
  const [{ data: { books } = {}, fetching, error }] = useQuery({
    query: getBooksQuery,
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  const topRatedBooks = books.sort((book1, book2) => {
    const book1Sum = book1.reviews
      .map((i) => i.stars)
      .reduce((a, b) => a + b, 0)
    const book1Avg = book1Sum / book1.reviews.length

    const book2Sum = book2.reviews
      .map((i) => i.stars)
      .reduce((a, b) => a + b, 0)
    const book2Avg = book2Sum / book2.reviews.length

    return book2Avg - book1Avg
  })

  return (
    <div className="catalog catalog01" style={style}>
      <div className="container">
        <div className="row">
          <h2 className="title size02">Trending</h2>
        </div>

        <div className="row">
          {topRatedBooks.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
