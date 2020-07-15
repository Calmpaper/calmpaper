import React from 'react'

export default () => (
  <form action="http://dev08.morozovoleg.com/home.html" className="main-search">
    <svg className="icon icon-search">
      <use xlinkHref="#icon-search" />
    </svg>
    <input
      type="text"
      placeholder="Enter the name of the author, book or genre"
    />
    <button type="submit">Search</button>
  </form>
)
