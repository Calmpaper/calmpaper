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
          onClick={() => setTab('works')}
          className={tab === 'works' ? 'active' : ''}
          style={{ cursor: 'pointer' }}
        >
          Works
        </a>
        {/* <a
          onClick={() => setTab('activity')}
          className={tab === 'activity' ? 'active' : ''}
          style={{ cursor: 'pointer' }}
        >
          Activity
        </a> */}
        <a
          onClick={() => setTab('following')}
          className={tab === 'following' ? 'active' : ''}
          style={{ cursor: 'pointer' }}
        >
         {`Following ${followingCount}`}
        </a>
        <a
          onClick={() => setTab('followers')}
          className={tab === 'followers' ? 'active' : ''}
          style={{ cursor: 'pointer' }}
        >
          {`${followersCount} Followers`}
        </a>
      </div>
    </div>
  </div>
)
