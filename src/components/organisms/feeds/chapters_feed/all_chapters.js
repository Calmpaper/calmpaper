import React, { useState, useEffect } from 'react'
import { useQuery } from 'urql'
import { getAllChaptersQuery } from 'api'

import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'components/atoms/loader'
import Flex from 'components/atoms/flex'
import Chapter from 'components/molecules/chapter/list_item'

export default () => {
  const [page, setPage] = useState(1)
  const [refetch, setRefetch] = useState(false)
  const [
    { data: { chapters = [], chaptersCount } = {}, fetching, error },
  ] = useQuery({
    query: getAllChaptersQuery,
    variables: {
      first: 5 * page,
    },
  })

  useEffect(() => {
    setRefetch(true)
  }, [chapters])

  if (fetching && !refetch) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  if (chapters.length === 0) return null

  return (
    <div className="page-follow" style={{ padding: 0 }}>
      <div className="container">
        <div
          className="row"
          style={{ padding: 0, maxWidth: 750, margin: '0 auto' }}
        >
          <InfiniteScroll
            dataLength={chapters.length}
            next={() => setPage(page + 1)}
            hasMore={chapters.length !== chaptersCount}
            style={{ paddingTop: 10, marginTop: -10 }}
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
          >
            {chapters.map((chapter, index) => (
              <Chapter chapter={chapter} key={chapter.id} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
}
