import React from 'react'

const LoginBtn = () => (
  <li className="header-nav__item" style={{ position: 'relative' }}>
    {navigator.userAgent !== 'ReactSnap' && (
      <a
        className="header-nav__link"
        href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
      >
        Join
      </a>
    )}
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
