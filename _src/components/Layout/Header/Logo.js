import React from 'react'
import { Link } from 'react-router-dom'
import logo from 'assets/images/logo.svg'
import logoWhite from 'assets/images/logo-white.svg'

export default ({ user }) => (
  <div className="col">
    <div className="header-logo">
      <Link to="/" className="logo">
        <img
          src={window.location.pathname === '/' && !user ? logoWhite : logo}
          alt="logo"
        />
      </Link>
    </div>
  </div>
)
