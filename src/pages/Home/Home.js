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
  <div className="page-home04" style={{ paddingTop: '100px' }}>
    <div className="main">
      <div className="container">
        <div className="row">
          <h1 className="main-title">
            A platform for <br />
            your books.
          </h1>
          <p className="main-text">
            The easiest way to host, publish, and earn from your books. Build a
            community, collect donations and more.
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
              Write guides, stories, autobiographies, fiction, non-fiction...
              etc. Anything you want.
            </p>
          </div>
          <div className="item">
            <div className="item-img">
              <img src="img/home04/home-img02.svg" alt="home-img" />
            </div>
            <h2 className="item-title">Raise a Community today</h2>
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
            <h2 className="item-title">
              Collect Donations &amp; Subscriptions
            </h2>
            <p className="item-text">
              Accept payments with Stripe, Paypal &amp; Cryptocurrencies with 0%
              fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
