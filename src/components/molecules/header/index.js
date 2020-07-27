import { useContext } from 'react'
import { UserContext } from 'context'

import * as atoms from 'components/atoms'

export const header = ({ home = true }) => {
  const { user } = useContext(UserContext)

  return (
    <header>
      <div className="container">
        <div className="row">
          <atoms.logo />
          <div className="col">
            <nav className="header-nav"></nav>
          </div>
        </div>
      </div>
    </header>
  )
}
