import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'urql'
import { setChapterLike, removeLikeMutation } from 'api'
import moment from 'moment'

const Donation = ({ donation }) => (
  <div className="user-box">
    <div
      className="user-box__avatar"
      style={{
        backgroundImage: `url(${donation.payer.avatar})`,
        backgroundSize: 'cover',
      }}
    />
    <div className="user-box__info">
      <div className="user-box__inline">
        <div className="user-box__name" style={{ marginRight: 4 }}>
          {donation.payer.username || donation.payer.fullname}
        </div>
        <div className="user-box__date">
          {moment(donation.createdAt).fromNow()}
        </div>
      </div>
      <div className="user-box__comment">{donation.message}</div>
      <div className="user-box__money">{`$${donation.amount / 100}`}</div>
    </div>
  </div>
)

const DonationsPopup = ({ donations }) => {
  return (
    <div
      className="notification-box in"
      style={{ background: 'white', zIndex: 50 }}
    >
      <div className="notification-box__title">Donations</div>
      <div className="notification-box__body custom-scroll">
        {donations.map((donation) => (
          <Donation donation={donation} key={donation.id} />
        ))}
      </div>
    </div>
  )
}

export default ({ chapter, reexecuteQuery }) => {
  const currentPage =
    chapter.book.chapters.findIndex((c) => c.id === chapter.id) + 1
  const pagesCount = chapter.book.chapters.length
  const { push } = useHistory()
  const { user } = useContext(UserContext)
  const [showDonations, setShowDonations] = useState(false)

  const onComment = () => {
    document.getElementById('comments-section').scrollIntoView()
  }

  const [, setLike] = useMutation(setChapterLike)
  const [, removeLike] = useMutation(removeLikeMutation)

  const like = user && chapter.likes.find((like) => like.author.id === user.id)
  const isLiked = !!like

  const onLike = () => {
    if (!user) return null

    if (like) {
      removeLike({
        likeId: parseInt(like.id),
      }).then((r) => reexecuteQuery())
    } else {
      setLike({
        authorId: user.id,
        chapterId: chapter.id,
      }).then((r) => reexecuteQuery())
    }
  }

  const toNextChapter = () => {
    push(`/books/${chapter.book.id}/${currentPage + 1}`)
  }

  const toPreviousChapter = () => {
    push(`/books/${chapter.book.id}/${currentPage - 1}`)
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === pagesCount
  const isOnlyPage = pagesCount === 1

  return (
    <div className="page-widgets in">
      <div className="widget-page-menu">
        <div className="container" style={{ minHeight: 40 }}>
          {!isOnlyPage && (
            <button
              className={`widget-page-menu__btn-nav btn-prev ${
                isFirstPage ? 'disabled' : ''
              }`}
              style={isFirstPage ? { cursor: 'disabled' } : {}}
              onClick={!isFirstPage && toPreviousChapter}
            >
              Previous
            </button>
          )}

          <button className="widget-btn" onClick={onLike}>
            <svg
              className="icon icon-like"
              style={isLiked ? { fill: 'red' } : {}}
            >
              <use xlinkHref="#icon-like" />
            </svg>
          </button>
          <button className="widget-btn" onClick={onComment}>
            <svg className="icon icon-comments">
              <use xlinkHref="#icon-comments" />
            </svg>
          </button>

          {/*
          <button className="widget-btn">
            <svg className="icon icon-list">
              <use xlinkHref="#icon-list" />
            </svg>
          </button>
          <button className="widget-btn">
            <svg className="icon icon-setting">
              <use xlinkHref="#icon-setting" />
            </svg>
          </button>
*/}
          {!isOnlyPage && (
            <button
              className={`widget-page-menu__btn-nav btn-next ${
                isLastPage ? 'disabled' : ''
              }`}
              style={isLastPage ? { cursor: 'disabled' } : {}}
              onClick={!isLastPage && toNextChapter}
            >
              Next page
            </button>
          )}
        </div>
      </div>
      <div
        className="widget-donations notification-btn"
        onClick={() => setShowDonations(!showDonations)}
      >
        <svg className="icon icon-donations">
          <use xlinkHref="#icon-donations" />
        </svg>
        {chapter.donations.length > 0 && (
          <span className="notification-count">{chapter.donations.length}</span>
        )}
        {showDonations && <DonationsPopup donations={chapter.donations} />}
      </div>
    </div>
  )
}
