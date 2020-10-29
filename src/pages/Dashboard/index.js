import React, { useState, useContext } from 'react'
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from 'context'
import { useQuery, useMutation } from 'urql'
import { getBooksByAuthorQuery, deleteBookMutation } from 'api'
import { getUserSlug } from 'helpers'

import ConfirmationModal from 'components/ConfirmationModal'
import Header from 'components/Layout/Header'
import Loader from 'components/Loader'
import BookCover from 'components/atoms/book-cover'

const regex = /(<([^>]+)>)/gi

const Book = ({ book }) => {
  let sum = 0
  for (let i = 0; i < book.reviews.length; i++) {
    sum += parseInt(book.reviews[i].stars, 10) //don't forget to add the base
  }

  const { push } = useHistory()

  var avg = sum / book.reviews.length || 0

  const [, deleteBook] = useMutation(deleteBookMutation)
  const onDelete = () => deleteBook({ id: book.id })
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  return (
    <div className="item01 item">
      <BookCover
        book={book}
        isItem
        onClick={() => push(`/${getUserSlug(book.author)}/${book.slug}`)}
        className="clickable"
      />
      <div className="item-info" style={{ width: '100%' }}>
        <div className="item-head">
          <h2
            className="item-title clickable"
            onClick={() => push(`/${getUserSlug(book.author)}/${book.slug}`)}
          >
            {book.name}
          </h2>
          <div className="item-date">
            {moment(book.createdAt).format('MMM DD, YYYY')}
          </div>
        </div>
        <div className="item-desc">
          <p
            dangerouslySetInnerHTML={{
              __html:
                book.description.length > 300
                  ? book.description
                      .replace(/(?:\r\n|\r|\n)/g, '<br />')
                      .replace(regex, '')
                      .substring(0, 300)
                  : book.description,
            }}
          />
        </div>
        <div className="item-nums">
          <div className="about-num-panel">
            {/*
            <a href>
              <div className="about-num-panel-info">
                <div className="icon-box icon-box-paint">
                  <svg className="icon icon-rating">
                    <use xlinkHref="#icon-rating" />
                  </svg>
                </div>
                <div className="panel-num">{avg}</div>
              </div>
              <div className="about-num-panel-label">{book.reviews.length}</div>
            </a>
            */}
            <a href>
              <div className="about-num-panel-info">
                <div className="icon-box">
                  <svg className="icon icon-eye">
                    <use xlinkHref="#icon-eye" />
                  </svg>
                </div>
                <div className="panel-num">{book.views}</div>
              </div>
              <div className="about-num-panel-label">Unique views</div>
            </a>
            {/*
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
          */}
            <a href>
              <div className="about-num-panel-info">
                <div className="icon-box">
                  <svg className="icon icon-customers">
                    <use xlinkHref="#icon-customers" />
                  </svg>
                </div>
                <div className="panel-num">{book.readers.length}</div>
              </div>
              <div className="about-num-panel-label">Followers</div>
            </a>
            <a href>
              <div className="about-num-panel-info">
                <div className="icon-box">
                  <svg className="icon icon-paper">
                    <use xlinkHref="#icon-paper" />
                  </svg>
                </div>
                <div className="panel-num">{book.chapters.length}</div>
              </div>
              <div className="about-num-panel-label">Chapters</div>
            </a>
            {/*
          <a href>
            <div className="about-num-panel-info">
              <div className="icon-box">
                <svg className="icon icon-calendar">
                  <use xlinkHref="#icon-calendar" />
                </svg>
              </div>
              <div className="panel-num">12</div>
            </div>
            <div className="about-num-panel-label">Chapters Week</div>
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
*/}
          </div>
        </div>
        <div className="item-tags">
          <ul className="tags">
            {book.tags.map((tag) => (
              <li key={tag.id}>
                <button className="green">{tag.label}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="item-buttons">
          <button
            className="btn btn-line left"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            Delete
          </button>

          {showDeleteConfirmation && (
            <ConfirmationModal
              show={showDeleteConfirmation}
              close={() => {
                setShowDeleteConfirmation(false)
              }}
              onDelete={() => {
                onDelete()
                setShowDeleteConfirmation(false)
              }}
            />
          )}
          <Link
            to={{
              pathname: `/${getUserSlug(book.author)}/${book.slug}/edit`,
              state: { book },
            }}
          >
            <button className="btn btn-grey">Edit</button>
          </Link>
          <Link to={`/${getUserSlug(book.author)}/${book.slug}/new-page`}>
            <button className="btn btn-grey dark">Add page</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default () => {
  const { user } = useContext(UserContext)
  const [{ data: { books } = {}, fetching, error }] = useQuery({
    query: getBooksByAuthorQuery,
    variables: {
      authorId: user.id,
    },
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <>
      <Header withLine />
      <div className="page-dashboard">
        <div className="pagination">
          <div className="container">
            <Link to="/" className="pagination__link">
              Home
            </Link>
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
              <h1 className="page-title title size02">Your works</h1>
              <Link to="/publish" className="btn btn-color">
                Add serial
              </Link>
            </div>
          </div>
        </div>
        <div className="items">
          <div className="container">
            <div className="row">
              {books.map((book) => (
                <Book book={book} key={book.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*
      <Footer centered />
      */}
    </>
  )
}
