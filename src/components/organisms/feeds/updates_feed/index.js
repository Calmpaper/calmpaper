import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useQuery } from 'urql'
import { getLastChaptersQuery } from 'api'
import InfiniteScroll from 'react-infinite-scroll-component'

import Loader from 'components/Loader'
import Flex from 'components/atoms/flex'
import Item from './item'

export default () => {
  const [page, setPage] = useState(0)
  const [allChapters, setChapters] = useState([])
  const [refetch, setRefetch] = useState(false)
  const { user } = useContext(UserContext)
  const [
    {
      data: { chaptersFeed: chapters = [], chaptersFeedCount } = {},
      fetching,
      error,
    },
  ] = useQuery({
    query: getLastChaptersQuery,
    variables: {
      // skip: 5 * page,
      take: 5 * (page + 1),
      userId: user.id,
    },
    // pause: refetch,
  })

  useEffect(() => {
    // setChapters((c) => [...c, ...chapters])
    setRefetch(true)
  }, [chapters])

  if (fetching && !refetch) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  if (chapters.length === 0) return null

  return (
    <div className="page-follow" style={{ padding: 0 }}>
      <div className="container">
        <div className="follow-updates">
          <InfiniteScroll
            dataLength={chapters.length}
            next={() => setPage(page + 1)}
            hasMore={chapters.length !== chaptersFeedCount}
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
              <Item chapter={chapter} key={chapter.id} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
}
