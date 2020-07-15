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
          Action
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
          Adventure
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
          Psychological
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
          Fantasy
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
          Isekai
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
          Comedy
        </a>
      </div>
    </div>
  </div>
)
