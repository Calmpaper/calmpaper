import React, { useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet'
import { UserContext } from 'context'
import { useHistory, Link } from 'react-router-dom'

import Flex from 'components/atoms/flex'
import Loader from 'components/atoms/loader'
import Footer from 'components/molecules/footer'
import Header from 'components/Layout/Header'
import UpdatesFeed from 'components/organisms/feeds/updates_feed'

import BooksFeed from './BooksFeed'
import ChaptersFeed from './ChaptersFeed'
import WelcomeContent from 'pages/Welcome/Content'

export default () => {
  const { user, fetching } = useContext(UserContext)
  const { push } = useHistory()

  useEffect(() => {
    if (window.analytics) {
      window.analytics.page('home')
    }
  }, [window.analytics])

  useEffect(() => {
    if (
      user &&
      user.favoriteBooks.length === 0 &&
      user.books.length === 0 &&
      user.following.length === 0
    ) {
      push('/welcome')
    }
    // if (user && user.favoriteBooks.length === 0 && user.books.length !== 0) {
    //   push('/explore')
    // }
  }, [user, push])

  if (fetching) {
    return (
      <div className="asdh2jj">
        <Loader />
      </div>
    )
  }

  if (!user || navigator.userAgent === 'ReactSnap') {
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
      <div className="page-empty" style={{ marginTop: -84 }}>
        <WelcomeContent />
      </div>
      <Flex column style={{ marginTop: -128 }}>
        {/*
        <ChaptersFeed />
        */}
        <UpdatesFeed />
        <BooksFeed />
      </Flex>
      {/*
      <Footer centered />
      */}
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
          <Link
            to={`/auth-fail`}
            className="btn btn-color"
            style={{ cursor: 'pointer' }}
          >
            Get started
          </Link>
          {/*
          <a
            href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
            className="btn btn-color"
            style={{ cursor: 'pointer' }}
          >
            Get started
          </a>
*/}
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
              Write anything. Your book, your rules. Even 1 page is fine.
            </p>
          </div>
          <div className="item">
            <div className="item-img">
              <img src="img/home04/home-img02.svg" alt="home-img" />
            </div>
            <h2 className="item-title">2. Share to your fans</h2>
            <p className="item-text">
              Let your friends follow your books and receive updates.
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
            <h2 className="item-title">3. Get feedback</h2>
            <p className="item-text">
              Get comments and feedback, while you write on your own time.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
