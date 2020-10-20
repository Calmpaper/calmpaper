import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getUserQuery } from 'api'

import Header from 'components/Layout/Header'
import Loader from 'components/Loader'

import UserHead from './Head'
import Tabs from './Tabs'
import Feed from './Feed'
import Books from './Books'
import Followers from './Followers'
import Following from './Following'
import ActivityFeed from './ActivityFeed'

export default () => {
  const [tab, setTab] = useState('feed')
  const { userId, username } = useParams()

  const [{ data: { user } = {}, fetching, error }] = useQuery({
    query: getUserQuery,
    variables: username ? { username } : { id: parseInt(userId) },

    pause: !(userId || username),
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <>
      <Header withLine />
      <div className="page-home page-profile02 ">
        <UserHead user={user} />
        <Tabs
          tab={tab}
          setTab={setTab}
          followersCount={user.followers.length}
          followingCount={user.following.length}
        />
        {tab === 'feed' && <Feed authorId={user.id} />}
        {tab === 'books' && <Books books={user.books} />}
        {tab === 'followers' && <Followers users={user.followers} />}
        {tab === 'following' && <Following users={user.following} />}
        {tab === 'activity' && (
          <ActivityFeed userId={userId} username={username} />
        )}
      </div>
    </>
  )
}
