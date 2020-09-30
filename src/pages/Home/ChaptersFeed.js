import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useQuery } from 'urql'
import { getLastChaptersQuery } from 'api'

import Loader from 'components/Loader'
import Chapter from 'components/molecules/chapter'

export default ({ sort }) => {
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
      skip: 3 * page,
      userId: user.id,
    },
    // pause: refetch,
  })

  useEffect(() => {
    setChapters((c) => [...c, ...chapters])
    setRefetch(true)
  }, [chapters])

  if (fetching && !refetch) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  if (allChapters.length === 0) return null

  return (
    <div className="latest">
      <div className="container">
        <div className="row">
          <h2 className="title size02">Updates from books you follow</h2>
        </div>
        <div className="row" style={{ maxWidth: '750px', margin: 'auto' }}>
          {allChapters.map((chapter) => (
            <Chapter chapter={chapter} key={chapter.key} />
          ))}
          {allChapters.length < chaptersFeedCount && allChapters.length !== 0 && (
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
