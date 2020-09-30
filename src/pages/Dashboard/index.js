import React from 'react'
import Header from 'components/Layout/Header'
import Footer from 'components/molecules/footer'

export default () => {
  return (
    <>
      <Header withLine />
      <div className="page-dashboard">
        <div className="pagination">
          <div className="container">
            <a href className="pagination__link">
              Home
            </a>
            <svg className="icon icon-arrow-right">
              <use xlinkHref="#icon-arrow-right" />
            </svg>
            <a href className="pagination__link active">
              Dashboard
            </a>
          </div>
        </div>
        <div className="page-head">
          <div className="container">
            <div className="row">
              <h1 className="page-title title size02">Series #1</h1>
              <a href className="btn btn-color">
                Add Series
              </a>
            </div>
          </div>
        </div>
        <div className="items">
          <div className="container">
            <div className="row">
              <div className="item01 item">
                <div
                  className="item-img"
                  style={{ backgroundImage: 'url(img/dashboard/book01.jpg)' }}
                />
                <div className="item-info">
                  <div className="item-head">
                    <h2 className="item-title">
                      Arcflame, the strongest tree-growing dragon
                    </h2>
                    <div className="item-date">Jun 26, 2020</div>
                  </div>
                  <div className="item-desc">
                    <p>
                      800 years ago, Arcflame terrorized the wolrd. Millions of
                      monsters lived in fear, as they were forced to grow trees.
                      One day, he was practicing a spell to speed up the growth
                      of trees and was lost in a time hole...
                    </p>
                  </div>
                  <div className="item-nums">
                    <div className="about-num-panel">
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box icon-box-paint">
                            <svg className="icon icon-rating">
                              <use xlinkHref="#icon-rating" />
                            </svg>
                          </div>
                          <div className="panel-num">10.0</div>
                        </div>
                        <div className="about-num-panel-label">753 905</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-eye">
                              <use xlinkHref="#icon-eye" />
                            </svg>
                          </div>
                          <div className="panel-num">920.4k</div>
                        </div>
                        <div className="about-num-panel-label">
                          Unique views
                        </div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-mark">
                              <use xlinkHref="#icon-mark" />
                            </svg>
                          </div>
                          <div className="panel-num">12.3k</div>
                        </div>
                        <div className="about-num-panel-label">Favorites</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-customers">
                              <use xlinkHref="#icon-customers" />
                            </svg>
                          </div>
                          <div className="panel-num">13.9k</div>
                        </div>
                        <div className="about-num-panel-label">Readers</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-paper">
                              <use xlinkHref="#icon-paper" />
                            </svg>
                          </div>
                          <div className="panel-num">146</div>
                        </div>
                        <div className="about-num-panel-label">Chapters</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-calendar">
                              <use xlinkHref="#icon-calendar" />
                            </svg>
                          </div>
                          <div className="panel-num">12</div>
                        </div>
                        <div className="about-num-panel-label">
                          Chapters Week
                        </div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-words">
                              <use xlinkHref="#icon-words" />
                            </svg>
                          </div>
                          <div className="panel-num">26750</div>
                        </div>
                        <div className="about-num-panel-label">Words</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-pan">
                              <use xlinkHref="#icon-pan" />
                            </svg>
                          </div>
                          <div className="panel-num">796</div>
                        </div>
                        <div className="about-num-panel-label">Reviews</div>
                      </a>
                    </div>
                  </div>
                  <div className="item-tags">
                    <ul className="tags">
                      <li>
                        <button className="green">Action</button>
                      </li>
                      <li>
                        <button className="green">Adventure</button>
                      </li>
                      <li>
                        <button className="green">Fantasy</button>
                      </li>
                      <li>
                        <button className="green">School Life</button>
                      </li>
                    </ul>
                  </div>
                  <div className="item-buttons">
                    <button className="btn btn-line left">Delete</button>
                    <button className="btn btn-grey dark">Add chapter</button>
                    <button className="btn btn-grey">Edit</button>
                    <button className="btn btn-grey">Stats</button>
                  </div>
                </div>
              </div>
              <div className="item02 item">
                <div
                  className="item-img"
                  style={{ backgroundImage: 'url(img/dashboard/book02.jpg)' }}
                />
                <div className="item-info">
                  <div className="item-head">
                    <h2 className="item-title">The Vanishing Half: A Novel</h2>
                    <div className="item-date">Jun 20, 2020</div>
                  </div>
                  <div className="item-desc">
                    <p>
                      Bennett’s tone and style recalls James Baldwin and
                      Jacqueline Woodson, but it’s especially reminiscent of
                      Toni Morrison’s 1970 debut novel, The Bluest Eye.” —Kiley
                      Reid, Wall Street Journal
                    </p>
                  </div>
                  <div className="item-nums">
                    <div className="about-num-panel">
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box icon-box-paint">
                            <svg className="icon icon-rating">
                              <use xlinkHref="#icon-rating" />
                            </svg>
                          </div>
                          <div className="panel-num">8.6</div>
                        </div>
                        <div className="about-num-panel-label">243 046</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-eye">
                              <use xlinkHref="#icon-eye" />
                            </svg>
                          </div>
                          <div className="panel-num">850.1k</div>
                        </div>
                        <div className="about-num-panel-label">All views</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-mark">
                              <use xlinkHref="#icon-mark" />
                            </svg>
                          </div>
                          <div className="panel-num">11.9k</div>
                        </div>
                        <div className="about-num-panel-label">Favorites</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-customers">
                              <use xlinkHref="#icon-customers" />
                            </svg>
                          </div>
                          <div className="panel-num">14.2k</div>
                        </div>
                        <div className="about-num-panel-label">Readers</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-paper">
                              <use xlinkHref="#icon-paper" />
                            </svg>
                          </div>
                          <div className="panel-num">76</div>
                        </div>
                        <div className="about-num-panel-label">Chapters</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-calendar">
                              <use xlinkHref="#icon-calendar" />
                            </svg>
                          </div>
                          <div className="panel-num">26</div>
                        </div>
                        <div className="about-num-panel-label">
                          Chapters Week
                        </div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-words">
                              <use xlinkHref="#icon-words" />
                            </svg>
                          </div>
                          <div className="panel-num">85904</div>
                        </div>
                        <div className="about-num-panel-label">Words</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-pan">
                              <use xlinkHref="#icon-pan" />
                            </svg>
                          </div>
                          <div className="panel-num">950</div>
                        </div>
                        <div className="about-num-panel-label">Reviews</div>
                      </a>
                    </div>
                  </div>
                  <div className="item-tags">
                    <ul className="tags">
                      <li>
                        <button className="green">Action</button>
                      </li>
                      <li>
                        <button className="green">Adventure</button>
                      </li>
                      <li>
                        <button className="green">Fantasy</button>
                      </li>
                      <li>
                        <button className="green">School Life</button>
                      </li>
                    </ul>
                  </div>
                  <div className="item-buttons">
                    <button className="btn btn-line left">Delete</button>
                    <button className="btn btn-grey dark">Add chapter</button>
                    <button className="btn btn-grey">Edit</button>
                    <button className="btn btn-grey">Stats</button>
                  </div>
                </div>
              </div>
              <div className="item03 item">
                <div
                  className="item-img"
                  style={{ backgroundImage: 'url(img/dashboard/book03.jpg)' }}
                />
                <div className="item-info">
                  <div className="item-head">
                    <h2 className="item-title">The Glass Hotel</h2>
                    <div className="item-date">Jun 20, 2020</div>
                  </div>
                  <div className="item-desc">
                    <p>
                      From the award-winning author of Station Eleven, a
                      captivating novel of money, beauty, white-collar crime,
                      ghosts, and moral compromise in which a woman disappears
                      from a container ship off the coast of Mauritania and a
                      massive Ponzi scheme...
                    </p>
                  </div>
                  <div className="item-nums">
                    <div className="about-num-panel">
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box icon-box-paint">
                            <svg className="icon icon-rating">
                              <use xlinkHref="#icon-rating" />
                            </svg>
                          </div>
                          <div className="panel-num">8.8</div>
                        </div>
                        <div className="about-num-panel-label">960 640</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-eye">
                              <use xlinkHref="#icon-eye" />
                            </svg>
                          </div>
                          <div className="panel-num">237.6k</div>
                        </div>
                        <div className="about-num-panel-label">All views</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-mark">
                              <use xlinkHref="#icon-mark" />
                            </svg>
                          </div>
                          <div className="panel-num">36.8k</div>
                        </div>
                        <div className="about-num-panel-label">Favorites</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-customers">
                              <use xlinkHref="#icon-customers" />
                            </svg>
                          </div>
                          <div className="panel-num">75.4k</div>
                        </div>
                        <div className="about-num-panel-label">Readers</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-paper">
                              <use xlinkHref="#icon-paper" />
                            </svg>
                          </div>
                          <div className="panel-num">76</div>
                        </div>
                        <div className="about-num-panel-label">Chapters</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-calendar">
                              <use xlinkHref="#icon-calendar" />
                            </svg>
                          </div>
                          <div className="panel-num">26</div>
                        </div>
                        <div className="about-num-panel-label">
                          Chapters Week
                        </div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-words">
                              <use xlinkHref="#icon-words" />
                            </svg>
                          </div>
                          <div className="panel-num">296049</div>
                        </div>
                        <div className="about-num-panel-label">Words</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-pan">
                              <use xlinkHref="#icon-pan" />
                            </svg>
                          </div>
                          <div className="panel-num">950</div>
                        </div>
                        <div className="about-num-panel-label">Reviews</div>
                      </a>
                    </div>
                  </div>
                  <div className="item-tags">
                    <ul className="tags">
                      <li>
                        <button className="green">Action</button>
                      </li>
                      <li>
                        <button className="green">Adventure</button>
                      </li>
                      <li>
                        <button className="green">Fantasy</button>
                      </li>
                      <li>
                        <button className="green">School Life</button>
                      </li>
                    </ul>
                  </div>
                  <div className="item-buttons">
                    <button className="btn btn-line left">Delete</button>
                    <button className="btn btn-grey dark">Add chapter</button>
                    <button className="btn btn-grey">Edit</button>
                    <button className="btn btn-grey">Stats</button>
                  </div>
                </div>
              </div>
              <div className="item04 item">
                <div
                  className="item-img"
                  style={{ backgroundImage: 'url(img/dashboard/book04.jpg)' }}
                />
                <div className="item-info">
                  <div className="item-head">
                    <h2 className="item-title">Rodham: A Novel</h2>
                    <div className="item-date">May 19, 2020</div>
                  </div>
                  <div className="item-desc">
                    <p>
                      Deviously clever . . . Sittenfeld’s Hillary is both a
                      player in the Game of Thrones and a romance novel heroine.
                      She’s a brilliant badass who has found her voice and knows
                      how to use it. She’s whoever she wants to be.”—O: The
                      Oprah Magazine
                    </p>
                  </div>
                  <div className="item-nums">
                    <div className="about-num-panel">
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box icon-box-paint">
                            <svg className="icon icon-rating">
                              <use xlinkHref="#icon-rating" />
                            </svg>
                          </div>
                          <div className="panel-num">9.2</div>
                        </div>
                        <div className="about-num-panel-label">356 079</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-eye">
                              <use xlinkHref="#icon-eye" />
                            </svg>
                          </div>
                          <div className="panel-num">237.6k</div>
                        </div>
                        <div className="about-num-panel-label">All views</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-mark">
                              <use xlinkHref="#icon-mark" />
                            </svg>
                          </div>
                          <div className="panel-num">36.8k</div>
                        </div>
                        <div className="about-num-panel-label">Favorites</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-customers">
                              <use xlinkHref="#icon-customers" />
                            </svg>
                          </div>
                          <div className="panel-num">75.4k</div>
                        </div>
                        <div className="about-num-panel-label">Readers</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-paper">
                              <use xlinkHref="#icon-paper" />
                            </svg>
                          </div>
                          <div className="panel-num">76</div>
                        </div>
                        <div className="about-num-panel-label">Chapters</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-calendar">
                              <use xlinkHref="#icon-calendar" />
                            </svg>
                          </div>
                          <div className="panel-num">26</div>
                        </div>
                        <div className="about-num-panel-label">
                          Chapters Week
                        </div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-words">
                              <use xlinkHref="#icon-words" />
                            </svg>
                          </div>
                          <div className="panel-num">296049</div>
                        </div>
                        <div className="about-num-panel-label">Words</div>
                      </a>
                      <a href>
                        <div className="about-num-panel-info">
                          <div className="icon-box">
                            <svg className="icon icon-pan">
                              <use xlinkHref="#icon-pan" />
                            </svg>
                          </div>
                          <div className="panel-num">950</div>
                        </div>
                        <div className="about-num-panel-label">Reviews</div>
                      </a>
                    </div>
                  </div>
                  <div className="item-tags">
                    <ul className="tags">
                      <li>
                        <button className="green">Action</button>
                      </li>
                      <li>
                        <button className="green">Adventure</button>
                      </li>
                      <li>
                        <button className="green">Fantasy</button>
                      </li>
                      <li>
                        <button className="green">School Life</button>
                      </li>
                    </ul>
                  </div>
                  <div className="item-buttons">
                    <button className="btn btn-line left">Delete</button>
                    <button className="btn btn-grey dark">Add chapter</button>
                    <button className="btn btn-grey">Edit</button>
                    <button className="btn btn-grey">Stats</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer centered />
    </>
  )
}
