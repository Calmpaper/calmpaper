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
                Read, Rate and <br />
                Relax
              </h1>
              <p className="main-text">
                Submit your web fiction. Readers will review it.
              </p>
              <a
                className="btn btn-color clickable"
                href="https://www.notion.so/calmpaper/Calmpaper-98cc389255594c5784502d8603bdcee4"
                target="_blank"
              >
                Full details
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
                  Write anything. Your fiction, your rules. Even 1 page is fine.
                </p>
              </div>
              <div className="item">
                <div className="item-img">
                  <img src="img/home04/home-img02.svg" alt="home-img" />
                </div>
                <h2 className="item-title">2. Readers review it</h2>
                <p className="item-text">
                  Readers will vote on your submission with their feedback
                  and rank it.
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
                <h2 className="item-title">3. Get a Ranking</h2>
                <p className="item-text">
                  Your submission will be ranked based on the feedback from
                  readers.
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
