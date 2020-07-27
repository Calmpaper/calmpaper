import Link from 'next/link'

export const logo = () => (
  <div className="col">
    <div className="header-logo">
      <Link href="/">
        <a className="logo">
          <img src="/img/logo-white.svg" alt="logo" />
        </a>
      </Link>
    </div>
  </div>
)
