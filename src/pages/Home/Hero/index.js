import React from 'react'

import homeBg from 'assets/images/home-bg.jpg'
import Search from './Search'
import Categories from './Categories'

export default () => (
  <div className="main" style={{ backgroundImage: `url(${homeBg})` }}>
    <div className="row">
      <h3 className="main-subtitle">Over 10,000 authors</h3>
      <h1 className="main-title">
        You will find your favorite <br />
        author!
      </h1>
      <Search />
      <Categories />
    </div>
  </div>
)
