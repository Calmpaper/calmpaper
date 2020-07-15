import React from 'react'
import Header from './Header'

export default ({ fullWidth = false, withLine }) =>
  fullWidth ? (
    <header>
      <div className="container">
        <Header />
      </div>
    </header>
  ) : (
    <header className={`header-black ${withLine ? 'header-line' : ''}`}>
      <Header />
    </header>
  )
