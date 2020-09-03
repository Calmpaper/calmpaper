import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useQuery } from 'urql'
import { getLastChaptersQuery } from 'api'

import Loader from 'components/Loader'
import Flex from 'components/atoms/flex'

const Chapter = ({ chapter }) => {
  const chapterPage =
    chapter.book.chapters.findIndex((c) => c.id === chapter.id) + 1

  var regex = /(<([^>]+)>)/gi

  return (
    <Link to={`/books/${chapter.book.id}/${chapterPage}`} className="item">
      <div
        className="item-img"
        style={{
          backgroundImage: `url("${
            chapter.book.image || '/img/placeholder.jpg'
          }")`,
        }}
      />
      <div className="item-info" style={{ width: '100%' }}>
        <div className="item-head">
          <h3 className="item-title">
            {chapter.book.name} · <span>{chapter.title}</span>
          </h3>
          <div
            className="item-time"
            style={{ minWidth: '190px', marginLeft: 8, textAlign: 'end' }}
          >{`${chapter.author.username || chapter.author.fullname}, ${moment(
            chapter.createdAt,
          ).fromNow()}`}</div>
        </div>
        <p className="item-text">{`${chapter.content
          .replace(regex, '')
          .substring(0, 155)}...`}</p>
        <ul className="item-category">
          {chapter.book.genres.map((genre) => (
            <li key={genre.id}>
              <a href>{genre.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

export default ({ sort }) => {
  const [page, setPage] = useState(0)
  const [allChapters, setChapters] = useState([])
  const [refetch, setRefetch] = useState(false)
  const [
    { data: { chaptersFeed: chapters = [] } = {}, fetching, error },
  ] = useQuery({
    query: getLastChaptersQuery,
    variables: {
      skip: 3 * page,
    },
    // pause: refetch,
  })

  useEffect(() => {
    setChapters((c) => [...c, ...chapters])
    setRefetch(true)
  }, [chapters])

  if (fetching && !refetch) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="latest">
      <div className="container">
        <div className="row">
          <h2 className="title size02">
            A better place to read and write things that matter
          </h2>
        </div>
        <div className="row" style={{ maxWidth: '750px', margin: 'auto' }}>
          {allChapters.map((chapter) => (
            <Chapter chapter={chapter} key={chapter.key} />
          ))}
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
          {/*
           */}
        </div>
      </div>
    </div>
  )
}
