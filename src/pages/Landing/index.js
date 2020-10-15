import React from 'react'
import Footer from 'components/molecules/footer'
import Header from 'components/Layout/Header'

export default () => (
  <>
    <Header fullWidth black />
    <div className="page-home04 landing-new" style={{ paddingTop: '100px' }}>
      <div className="main">
        <div className="container">
          <div className="row">
            <h1 className="main-title">
              A platform for <br />
              unfinished books.
            </h1>
            <p className="main-text">
              Share your unfinished books to your fans after finishing the first
              page, not 300 pages later
            </p>
            <a
              href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
              className="btn btn-color clickable"
            >
              Get started
            </a>
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
              <h2 className="item-title">2. Share to your fans</h2>
              <p className="item-text">
                Let your friends follow your books and receive updates.
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
