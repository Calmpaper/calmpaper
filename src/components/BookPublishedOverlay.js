import React, { useState } from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share'

export default ({ close }) => {
  const [isCopied, setCopied] = useState(false)
  return (
    <div id="popup-published" className="popup popup-published in">
      <div className="popup-wrap">
        <button className="btn popup-close" onClick={close}>
          Close
        </button>
        <div className="popup-box">
          <div className="popup-title">Your unfinished book is published!</div>
          <div className="popup-subtitle">
            Share your book to your friends, and people you know.
          </div>
          <div className="popup-buttons">
            {isCopied ? (
              <button
                className="btn btn-color"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                }}
              >
                <svg className="icon icon-copy" style={{ fill: 'white' }}>
                  <use xlinkHref="#icon-copy" />
                </svg>{' '}
                Copied!
              </button>
            ) : (
              <button
                className="btn btn-line"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  setCopied(true)
                }}
              >
                <svg className="icon icon-copy">
                  <use xlinkHref="#icon-copy" />
                </svg>{' '}
                Copy Link
              </button>
            )}
            <EmailShareButton url="https://calmpaper.org/books/69">
              <button className="btn btn-line">
                <svg className="icon icon-import">
                  <use xlinkHref="#icon-import" />
                </svg>{' '}
                Send via email
              </button>
            </EmailShareButton>
          </div>
          <div className="popup-share">
            <FacebookShareButton url="https://calmpaper.org/books/69">
              <button className="btn-social">
                <svg className="icon icon-facebook">
                  <use xlinkHref="#icon-facebook02" />
                </svg>
              </button>
            </FacebookShareButton>

            <RedditShareButton url="https://calmpaper.org/books/69">
              <button className="btn-social">
                <svg className="icon icon-linkedin">
                  <use xlinkHref="#icon-linkedin" />
                </svg>
              </button>
            </RedditShareButton>

            <TwitterShareButton url="https://calmpaper.org/books/69">
              <button className="btn-social">
                <svg className="icon icon-twitter">
                  <use xlinkHref="#icon-twitter03" />
                </svg>
              </button>
            </TwitterShareButton>
          </div>
        </div>
      </div>
    </div>
  )
}
