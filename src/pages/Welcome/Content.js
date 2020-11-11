import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { useHistory } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import SharePopup from 'components/Popups/SharePopup'

const Share = ({ setShowInvitePopup, user }) => {
  var rawStr = `user${user.id}`
  var wordArray = CryptoJS.enc.Utf8.parse(rawStr)
  var base64 = CryptoJS.enc.Base64.stringify(wordArray)

  return (
    <SharePopup
      close={() => setShowInvitePopup(false)}
      url={`https://calmpaper.org/invite?from=${base64}`}
      title="Invite your friends to write"
      invitedCount={user.invited.length || null}
      labelText="Send link (You will autofollow each other)"
    />
  )
}

export default () => {
  const [showInvitePopup, setShowInvitePopup] = useState(false)
  const { user } = useContext(UserContext)
  const { push } = useHistory()

  return (
    <div className="item" style={{ paddingTop: 0 }}>
      <div>
        <img src="/img/empty/empty01.svg" alt="Welcome!" />
        <h1 className="item-title">See updates here</h1>
        {/*
            <h1 className="item-title">
              Create your first book
            </h1>
            */}
        <p className="item-text">
          Follow an author or a fiction to see it's updates here, or write one yourself. <br />
          You can also invite people to write.
        </p>
        <div className="item-buttons">
          <button
            className="btn btn-color"
            onClick={() => push('/publish')}
            style={{ padding: '0 16px', width: 'auto' }}
          >
            Publish
          </button>
          <button
            className="btn btn-line"
            onClick={() => setShowInvitePopup(!showInvitePopup)}
            style={{
              padding: '0px 16px',
              width: 'auto',
            }}
          >
            {/*
              <svg className="icon icon-copy">
                <use xlinkHref="#icon-copy" />
              </svg>{' '}
            */}
            Invite friends
          </button>
        </div>
        {/*
        <Flex row justifyCenter>
          <a
            className="invite-link"
            onClick={() => setShowInvitePopup(!showInvitePopup)}
          >
            Invite your friends to write
          </a>
        </Flex>
        */}

        {showInvitePopup && (
          <Share setShowInvitePopup={setShowInvitePopup} user={user} />
        )}
      </div>
    </div>
  )
}
