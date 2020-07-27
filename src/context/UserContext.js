import { useState, useEffect, createContext } from 'react'
import { useQuery } from 'urql'
import { getMeQuery } from 'api'
import * as QueryString from 'query-string'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider
      value={{
        user: null,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider as default, UserContext }
