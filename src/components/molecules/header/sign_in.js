import { signIn } from 'next-auth/client'

export default () => (
  <li className="header-nav__item" style={{ position: 'relative' }}>
    <a className="header-nav__link" onClick={signIn}>
      Log In
    </a>
  </li>
)
