import React, { useContext } from 'react'
import { useQuery } from 'urql'
import { getBooksQuery } from 'api'
import { Link } from 'react-router-dom'

import Loader from 'components/Loader'
import Flex from 'components/Flex'

export default () => {
  const [{ data: { books } = {}, fetching, error }] = useQuery({
    query: getBooksQuery,
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="page-books-follows">
      <div className="latest">
        <div className="container">
          <div className="row">
            <h2 className="title size02">Find some great story</h2>
          </div>
          <div className="row" style={{ maxWidth: '750px', margin: 'auto' }}>
            {books.map((book, key) => (
              <Link to={`/books/${book.id}`}>{book.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
