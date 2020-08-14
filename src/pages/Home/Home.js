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
        <div className="page-home">
          <Header fullWidth />
          <Hero />
          <Flex column>
            {/*
            <Trending />
             */}
            <LastBooks style={{ paddingTop: 48 }} />
            <LastChapters />
          </Flex>
          <Footer centered />
        </div>
      </>
    )
  }

  return (
    <div className="page-home">
      <Header />
      <Flex column style={{ marginTop: 124 }}>
        <LastChapters />
        <Trending />
        <LastBooks />
      </Flex>
      <Footer centered />
    </div>
  )
}
