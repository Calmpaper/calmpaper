import React, { useState, useEffect, createContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import * as QueryString from 'query-string'
import { useQuery } from 'urql'
import { getMeQuery } from 'api'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const { search, pathname } = useLocation()
  const { replace } = useHistory()
  const [jwt, setJwt] = useState(window.localStorage.getItem('jwt'))

  const [{ data: { me: user } = {}, fetching }, reexecuteQuery] = useQuery({
    query: getMeQuery,
    pause: !jwt,
  })

  const signup = (token) => {
    window.localStorage.setItem('jwt', token)
    setJwt(token)
    replace('/')
  }

  const logout = () => {
    window.localStorage.removeItem('jwt')
    setJwt(null)
    replace(pathname)
  }

  const login = (token) => {
    window.localStorage.setItem('jwt', token)
    setJwt(token)
    replace('/')
  }

  useEffect(() => {
    if (user) {
      window.analytics &&
        window.analytics.identify(user.id, {
          username: user.username || user.fullname,
          email: user.email,
        })
    }
  }, [user])

  useEffect(() => {
    const params = QueryString.parse(search)
    if (params.token) {
      window.localStorage.setItem('jwt', params.token)
      reexecuteQuery({ requestPolicy: 'network-only' })
      setJwt(params.token)
      replace(pathname)
    }
  }, [search, replace, reexecuteQuery, pathname])

  return (
    <UserContext.Provider
      value={{
        user: jwt ? user : null,
        fetching,
        logout,
        signup,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider as default, UserContext }
