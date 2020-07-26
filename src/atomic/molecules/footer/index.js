import React from 'react'

const Links = () => (
  <ul className="footer-nav">
    <li>
      <a href="https://www.iubenda.com/terms-and-conditions/31556758">
        Privacy Policy
      </a>
    </li>
    <li>
      <a href="https://www.iubenda.com/terms-and-conditions/31556758">
        Terms of Service
      </a>
    </li>
    <li>
      <a href="https://calmpaper.com/books/8/1">About Us</a>
    </li>
    <li>
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('voicestorychatButton').click()
        }}
      >
        Contact Us
      </a>
    </li>
  </ul>
)

export default ({ centered = false }) => (
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
