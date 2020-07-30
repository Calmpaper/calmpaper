import React from 'react'

import homeBg from 'assets/images/home-bg.jpg'
import Search from './Search'
import Categories from './Categories'

export default () => (
  <div
    className="main"
    style={{ backgroundImage: `url(${homeBg})`, height: 600 }}
  >
    <div className="row">
      <h3 className="main-subtitle">Start writing your books now!</h3>
      <h1 className="main-title">
        A place for anyone
        <br />
        to write books
      </h1>
      <Search />
      {/*
      <Categories />
*/}
    </div>
  </div>
)
