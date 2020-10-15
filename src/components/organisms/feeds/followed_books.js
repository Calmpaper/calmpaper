import React, { useContext } from 'react'
import { UserContext } from 'context'
import { useQuery } from 'urql'
import { getFollowedBooksQuery } from 'api'

import Loader from 'components/Loader'
import Book from 'components/molecules/book'

export default ({ sort }) => {
  const { user } = useContext(UserContext)
  const [{ data: { books = [] } = {}, fetching, error }] = useQuery({
    query: getFollowedBooksQuery,
    variables: {
      userId: user.id,
    },
    pause: !user,
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  if (books.length === 0) return null

  return (
    <div className="catalog catalog02" style={{ marginTop: 80 }}>
      <div className="container">
        <div className="row">
          <h2 className="title size02">Followed books</h2>
        </div>

        <div className="row">
          {books.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
