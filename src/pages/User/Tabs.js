/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

export default ({ tab, setTab, followingCount, followersCount }) => (
  <div className="tabs">
    <div className="container">
      <div className="row">
        <a
          onClick={() => setTab('feed')}
          className={tab === 'feed' ? 'active' : ''}
          style={{ cursor: 'pointer' }}
        >
          Feed
        </a>
        <a
          onClick={() => setTab('books')}
          className={tab === 'books' ? 'active' : ''}
          style={{ cursor: 'pointer' }}
        >
          Books
        </a>
        <a
          onClick={() => setTab('activity')}
          className={tab === 'activity' ? 'active' : ''}
          style={{ cursor: 'pointer' }}
        >
          Activity
        </a>
        <a
          onClick={() => setTab('following')}
          className={tab === 'following' ? 'active' : ''}
          style={{ cursor: 'pointer' }}
        >
          {`Following (${followingCount})`}
        </a>
        <a
          onClick={() => setTab('followers')}
          className={tab === 'followers' ? 'active' : ''}
          style={{ cursor: 'pointer' }}
        >
          {`Followers (${followersCount})`}
        </a>
      </div>
    </div>
  </div>
)
