import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { useHistory } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import SharePopup from 'components/Popups/SharePopup'

export default () => {
  const [showInvitePopup, setShowInvitePopup] = useState(false)
  const { user } = useContext(UserContext)
  const { push } = useHistory()

  return (
    <div className="item" style={{ paddingTop: 0 }}>
      <div>
        <img src="/img/empty/empty01.svg" alt="Welcome!" />
        <h1 className="item-title">Follow a book or create one.</h1>
        {/*
            <h1 className="item-title">
              Create your first book
            </h1>
            */}
        <p className="item-text">
          Follow a book to see it's updates here, or write one yourself. <br />
          You can also invite friends to write.
        </p>
        <div className="item-buttons">
          <button
            className="btn btn-color"
            onClick={() => push('/new-book')}
            style={{ padding: '0 16px', width: 'auto' }}
          >
            Write a book
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
          <SharePopup
            close={() => setShowInvitePopup(false)}
            url={`https://calmpaper.org/invite?from=${CryptoJS.AES.encrypt(
              `user${user.id}`,
              'Look, a smart ass!',
            )}`}
            title="Invite your friends to write"
            invitedCount={user.invited.length || null}
            labelText="Send link (You will autofollow each other)"
          />
        )}
      </div>
    </div>
  )
}
