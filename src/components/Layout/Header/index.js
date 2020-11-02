import React, { useContext } from 'react'
import { UserContext } from 'context'
import Header from './Header'

export default ({
  fullWidth = false,
  withLine,
  black = false,
  children,
  style = {},
}) => {
  const { user } = useContext(UserContext)

  return (
    <>
      {fullWidth ? (
        <header
          className={`header ${black ? 'header-black' : ''}`}
          style={style}
        >
          <Header home>{children}</Header>
        </header>
      ) : (
        <header
          className={`header header-black ${withLine ? 'header-line' : ''}`}
          style={style}
        >
          <Header>{children}</Header>
        </header>
      )}
    </>
  )
}
