import React, { useContext } from 'react'
import { UserContext } from 'context'
import { Link } from 'react-router-dom'
import Footer from 'components/molecules/footer'
import Header from 'components/Layout/Header'

export default () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <Header fullWidth black />
      <div className="page-home04 landing-new" style={{ paddingTop: '100px' }}>
        <div className="main">
          <div className="container">
            <div className="row">
              <h1 className="main-title">
                Read and write <br />
                for stress relief
              </h1>
              <p className="main-text">
                Share your finished or unfinished books
              </p>
              {user ? (
                <Link className="btn btn-color clickable" to={`/new-book`}>
                  Write a book
                </Link>
              ) : (
                <a
                  href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
                  className="btn btn-color clickable"
                >
                  Get started
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="items">
          <div className="container">
            <div className="row">
              <div className="item">
                <div className="item-img">
                  <img src="img/home04/home-img01.svg" alt="home-img" />
                </div>
                <h2 className="item-title">1. Write Anything</h2>
                <p className="item-text">
                  Write anything. Your book, your rules. Even 1 page is fine.
                </p>
              </div>
              <div className="item">
                <div className="item-img">
                  <img src="img/home04/home-img02.svg" alt="home-img" />
                </div>
                <h2 className="item-title">2. Share</h2>
                <p className="item-text">
                  Let people follow your books and receive updates.
                </p>
              </div>
              <div className="item">
                <div className="item-img">
                  <img
                    src="img/home04/home-img03.svg"
                    alt="home-img"
                    className="item-img"
                  />
                </div>
                <h2 className="item-title">3. Get feedback</h2>
                <p className="item-text">
                  Get comments and feedback, while you write on your own time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer centered />
    </>
  )
}
