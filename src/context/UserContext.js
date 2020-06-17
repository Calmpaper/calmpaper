import React, { useState, createContext } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLogged, setLogged] = useState(false)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider as default, UserContext }
