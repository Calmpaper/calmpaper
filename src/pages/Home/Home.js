import React, { useEffect, useContext } from 'react'
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

  if (!user) {
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
  <div
    className="page-home04 landing-new"
    style={{ paddingTop: '100px', zoom: '80%' }}
  >
    <div className="main">
      <div className="container">
        <div className="row">
          <h1 className="main-title">
            A platform for <br />
            ongoing books.
          </h1>
          <p className="main-text">
            Why wait 300 pages later to share your book? Publish your book and
            grow your readers after finishing the first page.
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
            <h2 className="item-title">Write Anything</h2>
            <p className="item-text">
              Write as much or as little as you want. What matters is quality
              not quantity.
            </p>
          </div>
          <div className="item">
            <div className="item-img">
              <img src="img/home04/home-img02.svg" alt="home-img" />
            </div>
            <h2 className="item-title">Raise a Community</h2>
            <p className="item-text">
              Encourage discussions with a comments section whenever you add a
              new chapter.
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
            <h2 className="item-title">Start earning</h2>
            <p className="item-text">
              Let your readers subscribe and donate to you, while you write on
              your own time.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const LandingOld = () => (
  <div className="page-home04" style={{ paddingTop: '100px' }}>
    <div className="main">
      <div className="container">
        <div className="row">
          <h1 className="main-title">
            A platform for <br />
            ongoing books.
          </h1>
          <p className="main-text">
            Why wait 300 pages later to share your book? Publish your book and
            grow your readers after finishing the first page.
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
            <h2 className="item-title">Write Anything</h2>
            <p className="item-text">
              Write as much or as little as you want. What matters is quality
              not quantity.
            </p>
          </div>
          <div className="item">
            <div className="item-img">
              <img src="img/home04/home-img02.svg" alt="home-img" />
            </div>
            <h2 className="item-title">Raise a Community</h2>
            <p className="item-text">
              Encourage discussions with a comments section whenever you add a
              new chapter.
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
            <h2 className="item-title">Start earning</h2>
            <p className="item-text">
              Let your readers subscribe and donate to you, while you write on
              your own time.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
