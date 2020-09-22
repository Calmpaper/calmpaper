import React from 'react'

const Links = () => (
  <ul className="footer-nav">
    <li>
      <a
        href="https://www.iubenda.com/terms-and-conditions/31556758"
        target="_blank"
      >
        Privacy Policy
      </a>
    </li>
    <li>
      <a
        href="https://www.iubenda.com/terms-and-conditions/31556758"
        target="_blank"
      >
        Terms of Service
      </a>
    </li>
    {/*
    <li>
      <a href="https://calmpaper.com/books/8/1">About Us</a>
    </li>
*/}
    <li>
      <a href="mailto:hi@calmpaper.com">Contact Us</a>
    </li>
  </ul>
)

export default ({ centered = false, tel = false }) => (
  <footer
    className={`${
      centered ? '' : tel ? 'footer-tel' : 'footer-desc footer-col'
    }`}
  >
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
