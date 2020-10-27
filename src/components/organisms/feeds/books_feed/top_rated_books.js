import React, { useState, useEffect } from 'react'
import { useQuery } from 'urql'
import { topRatedBooksQuery } from 'api'

import InfiniteScroll from 'react-infinite-scroll-component'
import Flex from 'components/atoms/flex'

// import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'components/atoms/loader'
// import Flex from 'components/atoms/flex'
import Book from 'components/molecules/book/list_item'

export default () => {
  const [page, setPage] = useState(1)
  const [refetch, setRefetch] = useState(false)
  const [
    { data: { topRatedBooks: books = [], booksCount } = {}, fetching, error },
  ] = useQuery({
    query: topRatedBooksQuery,
    variables: {
     /*  skip: 5 * (page - 1), */
      take: 5 * page,
    },
  })

  useEffect(() => {
    setRefetch(true)
  }, [books])

  if (fetching && !refetch) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <InfiniteScroll
      className="row"
      dataLength={books.length}
      next={() => setPage(page + 1)}
      hasMore={books.length !== booksCount}
      loader={
        <Flex
          justifyCenter
          alignCenter
          style={{
            width: '100%',
            height: '100px',
          }}
        >
          <Loader />
        </Flex>
      }
      style={{
        maxWidth: '750px',
        margin: 'auto',
        paddingTop: '10px',
        marginTop: '-10px',
      }}
    >
      {books
        /* .filter((book) => book.chapters.length > 0) */
        .map((book, key) => (
          <Book book={book} key={book.id} isFirst={key === 0} />
        ))}
    </InfiniteScroll>
  )
}
