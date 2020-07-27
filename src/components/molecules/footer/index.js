import * as atoms from 'components/atoms'

const Links = () => (
  <ul className="footer-nav">
    <atoms.footer_link />
    <atoms.footer_link />
    <atoms.footer_link />
    <atoms.footer_link />
  </ul>
)

export const footer = ({ centered = true }) => (
  <footer className={centered ? '' : 'footer-col'}>
    <div className="container">
      <div className="row">
        <Links />
      </div>
      <div className="row" style={{ marginTop: 32 }}>
        <div className="footer-social">
          <span>© 2020 Calmpaper</span>
        </div>
      </div>
    </div>
  </footer>
)
