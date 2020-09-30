import React, { useState, useEffect } from 'react'
import { useQuery } from 'urql'
import { getLastChaptersByAuthorQuery } from 'api'

import Loader from 'components/Loader'
import Chapter from 'components/molecules/chapter'

export default ({ authorId }) => {
  const [page, setPage] = useState(0)
  const [showLoadMore, setShowLoadMore] = useState(true)
  const [allChapters, setChapters] = useState([])
  const [refetch, setRefetch] = useState(false)
  const [
    {
      data: {
        chaptersFeedByAuthor: chapters = [],
        chaptersFeedByAuthorCount,
      } = {},
      fetching,
      error,
    },
  ] = useQuery({
    query: getLastChaptersByAuthorQuery,
    variables: {
      skip: 3 * page,
      authorId,
    },
    // pause: refetch,
  })

  useEffect(() => {
    if (refetch && page !== 0 && chapters.length === 0) {
      setShowLoadMore(false)
    }
    setChapters((c) => [...c, ...chapters])
    setRefetch(true)
  }, [chapters])

  if (fetching && !refetch) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="latest" style={{ marginTop: 25 }}>
      <div className="container" style={{ padding: 0 }}>
        <div className="row">
          {allChapters.map((chapter) => (
            <Chapter chapter={chapter} key={chapter.key} />
          ))}
          {allChapters.length < chaptersFeedByAuthorCount &&
            allChapters.length !== 0 && (
              <div
                className="item"
                style={{
                  fontWeight: 400,
                  justifyContent: 'center',
                  background: '#fdfdfd',
                  color: '#040027',
                  fontSize: '15px',
                }}
                onClick={() => setPage((p) => p + 1)}
              >
                {fetching ? 'Loading...' : 'Load more'}
              </div>
            )}
          {/*
           */}
        </div>
      </div>
    </div>
  )
}
