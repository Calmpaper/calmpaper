import React, { useContext } from 'react'
import { UserContext } from 'context'

import Footer from 'components/Layout/Footer'
import Header from 'components/Layout/Header'
import Loader from 'components/Loader'
import Flex from 'components/Flex'

import Hero from './Hero'
import Trending from './Feed/Trending'
import LastBooks from './Feed/LastBooks'
import LastChapters from './Feed/LastChapters'

export default () => {
  const { user, fetching } = useContext(UserContext)

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
            <Trending />
            <LastBooks />
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
