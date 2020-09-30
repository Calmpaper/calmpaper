import React from 'react'
import Footer from 'components/molecules/footer'
import Header from 'components/Layout/Header'
import Content from './Content'

export default () => {
  return (
    <>
      <Header />
      <div className="page-empty">
        <div className="container">
          <Content />
        </div>
      </div>
      <Footer />
    </>
  )
}
