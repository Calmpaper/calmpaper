import React, { useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet'
import { UserContext } from 'context'

import Flex from 'components/atoms/flex'
import Loader from 'components/atoms/loader'
import Header from 'components/Layout/Header'

import WelcomeContent from 'pages/Welcome/Content'
import UpdatesFeed from 'components/organisms/feeds/updates_feed'

export default () => {
  const { fetching } = useContext(UserContext)

  useEffect(() => {
    if (window.analytics) {
      window.analytics.page('feed')
    }
  }, [])

  if (fetching) {
    return (
      <div className="asdh2jj">
        <Loader />
      </div>
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
        <UpdatesFeed />
      </Flex>
    </div>
  )
}
