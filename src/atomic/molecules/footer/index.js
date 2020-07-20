import React from 'react'

const Links = () => (
  <ul className="footer-nav">
    <li>
      <a href="/">Help center</a>
    </li>
    <li>
      <a href="/">Privacy Policy</a>
    </li>
    <li>
      <a href="/">Terms of Service</a>
    </li>
    <li>
      <a href="/">About Us</a>
    </li>
    <li>
      <a href="/">Contact Us</a>
    </li>
  </ul>
)

export default ({ centered = false }) => (
  <footer className={centered ? '' : 'footer-col'}>
    <div className="container">
      <div className="row">
        <Links />
      </div>
      <div className="row">
        <div className="footer-social">
          <span>© 2020 Calmpaper</span>
        </div>
      </div>
    </div>
  </footer>
)
