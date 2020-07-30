export default () => (
  <li className="header-nav__item" style={{ position: 'relative' }}>
    <a
      className="header-nav__link"
      href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
    >
      Log In
    </a>
  </li>
)
