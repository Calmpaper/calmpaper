import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getUserQuery } from 'api'
import { UserContext } from 'context'

import Header from 'components/Layout/Header'
import Loader from 'components/Loader'
import NotFoundPage from 'pages/404'

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
  const { user: loggedUser } = useContext(UserContext)

  const [{ data: { user } = {}, fetching, error }] = useQuery({
    query: getUserQuery,
    variables: username ? { username } : { id: parseInt(userId) },

    pause: !(userId || username),
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  if (!fetching && !user) return <NotFoundPage />

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
        {tab === 'works' && <Books books={user.books} />}
        {tab === 'followers' && user.id === loggedUser.id && (
          <Followers users={user.followers} />
        )}
        {tab === 'following' && user.id === loggedUser.id && (
          <Following users={user.following} />
        )}
        {/* {tab === 'activity' && (
          <ActivityFeed userId={userId} username={username} />
        )} */}
      </div>
    </>
  )
}
