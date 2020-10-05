import React from 'react'

const SignupBtn = () => (
  <li className="header-nav__item" style={{ marginRight: 0 }}>
    {navigator.userAgent !== 'ReactSnap' && (
      <a
        className="btn-login"
        href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
      >
        Login
      </a>
    )}
  </li>
)

export default SignupBtn

// const SignupBtn = () => (

//           <li className="header-nav__item" style={{ marginRight: 0 }}>
//             <Link to={`/signup`} className="btn-login">
//               Sign Up
//             </Link>
//           </li>
// )
