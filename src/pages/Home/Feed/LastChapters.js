import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useQuery } from 'urql'
import { getLastChaptersQuery } from 'api'

import Loader from 'components/Loader'

export default ({ sort }) => {
  const [{ data: { chapters } = {}, fetching, error }] = useQuery({
    query: getLastChaptersQuery,
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="latest">
      <div className="container">
        <div className="row">
          <h2 className="title size02">Latest Updates</h2>
        </div>
        <div className="row">
          {chapters.map((chapter) => (
            <Link
              to={`/books/${chapter.book.id}/${chapter.id}`}
              key={chapter.id}
            >
              <div className="item">
                <div className="col">
                  <div
                    className="item-img"
                    style={{ backgroundImage: `url('${chapter.book.image}')` }}
                  />
                  <div className="item-info">
                    <h3 className="item-title">
                      {`${chapter.book.name} · ${chapter.title}`}
                    </h3>
                    {chapter.book.genres.length > 0 && (
                      <ul className="item-category">
                        {chapter.book.genres.map((genre) => (
                          <li key={genre.id}>
                            <a href>{genre.label}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="item-time">{`${
                    chapter.author.fullname
                  }, ${moment(chapter.createdAt).fromNow()}`}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
