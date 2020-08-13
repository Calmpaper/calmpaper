import React from 'react'
import cat from 'assets/images/cat-fantasy-bg.png'

export default () => (
  <div className="main-category">
    <div className="row">
      <div className="col" style={{ width: '311px' }}>
        <a
          href="/"
          className="main-category-item"
          style={{
            width: '126px',
            height: '114px',
            background: '#5BC1EE',
          }}
        >
          Diary
        </a>
        <a
          href="/"
          className="main-category-item"
          style={{
            width: '160px',
            height: '114px',
            background: '#E8857A',
          }}
        >
          Biography
        </a>
        <a
          href="/"
          className="main-category-item"
          style={{
            width: '300px',
            height: '168px',
            background: '#7FBFC7',
          }}
        >
          Business
        </a>
      </div>
      <div
        className="col"
        style={{
          width: '280px',
          padding: '0 3px',
          boxSizing: 'border-box',
        }}
      >
        <a
          href="/"
          className="main-category-item"
          style={{
            width: '263px',
            height: '296px',
            background: '#5BC1EE',
            backgroundImage: `url(${cat})`,
          }}
        >
          Technology
        </a>
      </div>
      <div className="col" style={{ width: '170px' }}>
        <a
          href="/"
          className="main-category-item"
          style={{
            width: '160px',
            height: '164px',
            background: '#3A8EEF',
          }}
        >
          Science
        </a>
        <a
          href="/"
          className="main-category-item"
          style={{
            width: '160px',
            height: '118px',
            background: '#3ABD98',
          }}
        >
          History
        </a>
      </div>
    </div>
  </div>
)
