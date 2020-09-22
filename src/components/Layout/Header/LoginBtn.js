import React from 'react'

const LoginBtn = () => (
  <li className="header-nav__item" style={{ position: 'relative' }}>
    <a
      className="header-nav__link"
      href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
    >
      Log In
    </a>
  </li>
)
// const LoginBtn = () => (
//   <li className="header-nav__item" style={{ position: 'relative' }}>
//     <Link className="header-nav__link" to={`/login`}>
//       Log In
//     </Link>
//   </li>
// )

export default LoginBtn
