import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useQuery } from 'urql'
import { getLastChaptersQuery } from 'api'

import Loader from 'components/Loader'
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
      skip: 5 * page,
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
    <div className="page-follow" style={{ padding: 0 }}>
      <div className="container">
        <div className="follow-updates">
          <h2 className="title size02">Updates from books you follow</h2>
          {chapters.map((chapter) => (
            <Item chapter={chapter} key={chapter.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
