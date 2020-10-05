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
          <div className="tab-item tab-activity in">
            <div className="block first">
              <div
                className="block-avatar"
                style={{ backgroundImage: 'url(img/profile03/avatar01.png)' }}
              />
              <div className="block-info">
                <div className="block-head">
                  <div className="block-name">Ediav42</div>
                  <div className="block-date">3 hours ago</div>
                </div>
                <div className="block-comment">
                  Commented on{' '}
                  <a href>chapter 226: The Start of a Daily Life</a>
                </div>
                <div className="block-text">
                  Well she can still contact his spirit in the afterlife...
                </div>
              </div>
            </div>
            <div className="block">
              <div
                className="block-avatar"
                style={{ backgroundImage: 'url(img/profile03/avatar02.png)' }}
              />
              <div className="block-info">
                <div className="block-head">
                  <div className="block-name">Erik Binggeser</div>
                  <div className="block-date">8 hours ago</div>
                </div>
                <div className="block-comment">
                  Commented on <a href>chapter 40</a>
                </div>
                <div className="block-white">
                  making Abraxis iuunrelenting, as death should be. <br />
                  Once I messed around with his modifiers a bit, I saved them
                  and went to choos a name.
                </div>
                <div className="block-text">
                  Very well-written article. I had no idea who was responsible
                  for the surveillance video. It must've been terrifying to step
                  up, and I applaud Mr. West for his actions.
                </div>
              </div>
            </div>
            <div className="block">
              <div
                className="block-avatar"
                style={{ backgroundImage: 'url(img/profile03/avatar03.png)' }}
              />
              <div className="block-info">
                <div className="block-head">
                  <div className="block-name">Seth Eckert</div>
                  <div className="block-date">9 hours ago</div>
                </div>
                <div className="block-comment">
                  Commented on <a href>chapter 58</a>
                </div>
                <div className="block-white">profets</div>
                <div className="block-text">
                  Is there any indication how his business is faring? Is there
                  anything we who are...
                </div>
              </div>
            </div>
            <div className="block last">
              <div
                className="block-avatar"
                style={{ backgroundImage: 'url(img/profile03/avatar04.png)' }}
              />
              <div className="block-info">
                <div className="block-head">
                  <div className="block-name">Tomas Brunsdon</div>
                  <div className="block-date">5 days ago</div>
                </div>
                <div className="block-comment">
                  Commented on <a href>chapter 29</a>
                </div>
                <div className="block-white">
                  People who capture these important events on video should be
                  very well compensated by the commercial news outlets that
                  rebroadcast their original one of a kind footage over and over
                  and over in between the thousands of ad spots SELL.{' '}
                </div>
                <div className="block-text">
                  This is a great article. Rashad made history. Wow. He is an
                  inspiring man.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
