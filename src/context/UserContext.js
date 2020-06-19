import React, { useState, useEffect, createContext } from 'react'
import { useMutation } from 'urql'
import { createUserMutation } from 'api'
import * as localForage from 'localforage'

localForage.config({
  name: 'cra-app-2',
  version: 1.0,
  storeName: 'cra_app_2', // Should be alphanumeric, with underscores.
  description: 'cra_app_2',
})

window.lf = localForage.createInstance({
  name: 'cra_app_2',
})

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [isLogged, setLogged] = useState(false)

  const [{ data, fetching, error }, createUser] = useMutation(
    createUserMutation,
  )

  useEffect(() => {
    window.lf.getItem('user').then((u) => setUser(u))
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        username: user ? user.username : undefined,
        setUser,
        isLogged,
        setLogged,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider as default, UserContext }
