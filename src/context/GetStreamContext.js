import React, { useState, useEffect, createContext, useContext } from 'react'
import { UserContext } from 'context'
import { connect } from 'getstream'

const API_1 = 'c2u3fw52wm4t'
const API_2 = 'grdr5z6ras7ugc33ezbqswq6k6pggrad4armpg3xjskpgp7gwttmqjgyfg86pn8z'
const API_3 = '85679'

const GetStreamContext = createContext()

const GetStreamProvider = ({ children }) => {
  const [client, setClient] = useState(undefined)

  const { user } = useContext(UserContext)
  const [userFeed, setUserFeed] = useState(undefined)

  const [notificationsFeed, setNotificationsFeed] = useState(undefined)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (user) {
      const client = connect(API_1, user.getStreamToken, API_2, API_3)
      setClient(client)

      setNotificationsFeed(
        client.feed('notifications', user.id, user.getStreamToken),
      )
      setUserFeed(client.feed('user', user.id, user.getStreamToken))
    }
  }, [user])

  useEffect(() => {
    if (notificationsFeed) {
      notificationsFeed.get().then(({ results }) => {
        setNotifications(results)
      })
    }
  }, [notificationsFeed])

  const addActivity = ({
    actor = client.currentUser,
    object,
    verb = 'start',
    ...props
  }) => {
    const user1 = client && user && client.feed('user', user.id)

    const activity = {
      actor,
      verb,
      object,
      ...props,
    }
    user1.addActivity(activity)
  }

  return (
    <GetStreamContext.Provider
      value={{
        client,
        userFeed,
        notificationsFeed,

        notifications,
        addActivity,
      }}
    >
      {children}
    </GetStreamContext.Provider>
  )
}

export { GetStreamProvider as default, GetStreamContext }
