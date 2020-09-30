import React from 'react'
import Header from 'components/Layout/Header'
import Footer from 'components/molecules/footer'
import Explore from 'components/Explore'
import Flex from 'components/atoms/flex'

export default () => {
  return (
    <div className="page-home">
      <Header />
      <Flex column style={{ marginTop: 124 }}>
        <Explore />
      </Flex>
      {/*
      <Footer centered />
      */}
    </div>
  )
}
