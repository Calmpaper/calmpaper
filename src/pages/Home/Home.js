import React, { useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet'
import { UserContext } from 'context'

import Flex from 'components/atoms/flex'
import Loader from 'components/atoms/loader'
import Footer from 'components/molecules/footer'
import Header from 'components/Layout/Header'

import Hero from './Hero'
import Trending from './Feed/Trending'
import LastBooks from './Feed/LastBooks'
import LastChapters from './Feed/LastChapters'

export default () => {
  const { user, fetching } = useContext(UserContext)

  useEffect(() => {
    if (window.analytics) {
      window.analytics.page('home')
    }
  }, [window.analytics])

  if (fetching) {
    return (
      <div className="asdh2jj">
        <Loader />
      </div>
    )
  }

  if (!user && navigator.userAgent !== 'ReactSnap') {
    return (
      <>
        <Header fullWidth black />
        <Landing />
        <Footer centered />
      </>
    )
  }

  return (
    <div className="page-home">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Calmpaper</title>
      </Helmet>
      <Header />
      <Flex column style={{ marginTop: 124 }}>
        <LastChapters />
        {/*
        <Trending />
        */}
        <LastBooks />
      </Flex>
      <Footer centered />
    </div>
  )
}

const Landing = () => (
  <div className="page-home04 landing-new" style={{ paddingTop: '100px' }}>
    <div className="main">
      <div className="container">
        <div className="row">
          <h1 className="main-title">
            A platform for <br />
            unfinished books.
          </h1>
          <p className="main-text">
            Share your unfinished books to your fans after finishing the first
            page, not 300 pages later
          </p>
          <a
            href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
            className="btn btn-color"
            style={{ cursor: 'pointer' }}
          >
            Get started
          </a>
        </div>
      </div>
    </div>
    <div className="items">
      <div className="container">
        <div className="row">
          <div className="item">
            <div className="item-img">
              <img src="img/home04/home-img01.svg" alt="home-img" />
            </div>
            <h2 className="item-title">1. Write Anything</h2>
            <p className="item-text">
              Write guides, stories, comics, fiction, non-fiction... etc. Your
              book, your rules.
            </p>
          </div>
          <div className="item">
            <div className="item-img">
              <img src="img/home04/home-img02.svg" alt="home-img" />
            </div>
            <h2 className="item-title">2. Share to your fans</h2>
            <p className="item-text">
              Let your followers subscribe to your content and comment on every
              page.
            </p>
          </div>
          <div className="item">
            <div className="item-img">
              <img
                src="img/home04/home-img03.svg"
                alt="home-img"
                className="item-img"
              />
            </div>
            <h2 className="item-title">3. Earn</h2>
            <p className="item-text">
              Allow subscriptions and donations, while you write on your own
              time.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
