/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Header from 'components/Layout/Header'
import Flex from 'components/atoms/flex'
import Loader from 'components/atoms/loader'

import BooksFeed from 'components/organisms/feeds/books_feed/all_books'
// import BooksFeedHorizontal from 'components/organisms/feeds/books_feed/all_books_horizontal'
// import ChaptersFeed from 'components/organisms/feeds/chapters_feed/all_chapters'
import TopRatedFeed from 'components/organisms/feeds/books_feed/top_rated_books'
import PopularFeed from 'components/organisms/feeds/books_feed/popular_books'
// import ChaptersFeed from 'components/organisms/feeds/updates_feed'
//import CommentsFeed from 'components/organisms/feeds/comments_feed'

export default () => {
  const { user, fetching: userFetching } = useContext(UserContext)
  const { push } = useHistory()
  const [tab, setTab] = useState('topRated')

  useEffect(() => {
    if (window.analytics) {
      window.analytics.page('home')
    }
  }, [])

  if (userFetching) {
    return (
      <div className="asdh2jj">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Calmpaper</title>
      </Helmet>
      <div className="page-home">
        <Header />
        <Flex column style={{ marginTop: 124 }}>
          <div className="page-books-follows">
            <div className="latest">
              <div className="container">
                <div
                  className="row"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <h2 className="title size02">Read and review web serials</h2>
                  <div
                    className="item-buttons"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 100,
                      marginTop: -16,
                    }}
                  >
                    <button
                      className="btn btn-color"
                      onClick={() => {
                        if (user) {
                          push(`/publish`)
                        } else {
                          window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`
                        }
                      }}
                      style={{
                        padding: '0 16px',
                        marginRight: 8,
                        width: 'auto',
                      }}
                    >
                      {user ? 'Publish' : 'Get started'}
                    </button>
                    <button
                      className="btn btn-line"
                      onClick={() => push('/about')}
                      style={{
                        padding: '0px 16px',
                        width: 'auto',
                      }}
                    >
                      Learn more
                    </button>
                  </div>
                </div>
                <Flex row justifyCenter style={{ marginBottom: 24 }}>
                  <div className="tabs">
                    <div className="container">
                      <div
                        className="row"
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <a
                          className={tab === 'topRated' ? 'active' : ''}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setTab('topRated')}
                        >
                          Top rated
                        </a>
                        <a
                          className={tab === 'books' ? 'active' : ''}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setTab('books')}
                        >
                          New
                        </a>
                        <a
                          className={tab === 'popular' ? 'active' : ''}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setTab('popular')}
                        >
                          Popular
                        </a>
                        {/* <a
                          className={tab === 'updates' ? 'active' : ''}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setTab('updates')}
                        >
                          New pages
                        </a> */}
                        {/* <a
                          className={tab === 'comments' ? 'active' : ''}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setTab('comments')}
                        >
                          Latest comments
                        </a> */}
                      </div>
                    </div>
                  </div>
                </Flex>
                {tab === 'topRated' && <TopRatedFeed />}
                {tab === 'books' && <BooksFeed />}
                {/*  {tab === 'updates' && <ChaptersFeed />} */}
                {/*  {tab === 'comments' && <CommentsFeed />} */}
                {tab === 'popular' && <PopularFeed />}
              </div>
            </div>
          </div>
        </Flex>
      </div>
    </>
  )
}
