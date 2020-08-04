import { useRouter } from 'next/router'
import Link from 'next/link'

export const logo = () => {
  const { pathname } = useRouter()

  return (
    <div className="col">
      <div className="header-logo">
        <Link href="/">
          <a className="logo">
            <img
              src={pathname === '/' ? '/img/logo-white.svg' : '/img/logo.svg'}
              alt="Calmpaper"
            />
          </a>
        </Link>
      </div>
    </div>
  )
}
