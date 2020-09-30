import React, { useState, useEffect, useRef } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share'
import Flex from 'components/Flex'

export default ({
  close,
  url = window.location.href,
  title = 'Invite your friends to read',
  invitedCount,
  labelText = 'Send link',
}) => {
  const [isCopied, setCopied] = useState(false)
  const popupRef = useRef()

  const handleClick = (e) => {
    if (popupRef.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    close()
  }

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick)
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  return (
    <div id="popup-invite" className="popup popup-invite in">
      <div className="popup-wrap">
        <div className="popup-box" ref={popupRef}>
          <div className="popup-head">
            <img
              src="/img/popup/popup-icon05.svg"
              alt="icon"
              className="popup-head-icon"
              style={{ marginLeft: 0 }}
            />
            <h3 className="popup-title">{title}</h3>
          </div>
          <div className="popup-body">
            <img src="/img/popup/popup-invite.svg" alt="invite" />
            <div className="popup-form">
              <div
                className="popup-form-title"
                style={{ textAlign: 'initial' }}
              >
                {labelText}
              </div>
              <form>
                <input type="text" className="input" defaultValue={url} />
                {isCopied ? (
                  <button
                    className="btn btn-color"
                    style={{ background: '#7057d2' }}
                    onClick={(e) => {
                      e.preventDefault()
                      navigator.clipboard.writeText(url)
                    }}
                  >
                    Copied!
                  </button>
                ) : (
                  <button
                    className="btn btn-color"
                    onClick={(e) => {
                      e.preventDefault()
                      navigator.clipboard.writeText(url)
                      setCopied(true)
                    }}
                  >
                    Copy
                  </button>
                )}
              </form>
            </div>
          </div>
          <div className="popup-footer">
            <div className="col">
              {/*
              <button className="btn btn-color">Import contacts</button>
              */}
              <button className="btn btn-grey popup-close" onClick={close}>
                Close{' '}
                {/*
                <svg className="icon icon-close">
                  <use xlinkHref="#icon-close" />
                </svg>
                */}
              </button>
              {invitedCount && (
                <Flex
                  row
                  alignCenter
                  style={{
                    paddingBottom: '2px',
                    marginLeft: '4px',
                    fontSize: '15px',
                    color: '#7057d2',
                    fontWeight: 500,
                  }}
                >{`Referred: ${invitedCount}`}</Flex>
              )}
            </div>
            <div className="col popup-share">
              <FacebookShareButton url={url}>
                <button className="btn-social">
                  <svg className="icon icon-facebook">
                    <use xlinkHref="#icon-facebook02" />
                  </svg>
                </button>
              </FacebookShareButton>
              <LinkedinShareButton url={url}>
                <button className="btn-social">
                  <svg className="icon icon-linkedin">
                    <use xlinkHref="#icon-linkedin" />
                  </svg>
                </button>
              </LinkedinShareButton>
              <TwitterShareButton url={url}>
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
    </div>
  )
}
