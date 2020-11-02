import React, { useState, useRef } from 'react'
import { useMutation } from 'urql'
import { useHistory } from 'react-router-dom'
import { deleteBookMutation } from 'api'
import { getUserSlug } from 'helpers'

import { useOnClickOutside } from 'hooks'

import ConfirmationModal from 'components/ConfirmationModal'

export default ({ bookId, book, hide, hideEdit }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const { push } = useHistory()

  const [, deleteBook] = useMutation(deleteBookMutation)
  const onDelete = () => deleteBook({ id: bookId })  
  
  const popupRef = useRef()

  useOnClickOutside(popupRef, () => hide())

  return (
    <div  style={{ position: 'absolute' }}>
      <div
        ref={popupRef}        
        className="dropdown-box notification-box notification-header-box"
        style={{ top: 0 }}               
      >
        <div className="header-notification-user__body"  >
          <ul className="header-notification-user__list">
            {!hideEdit && (
              <li>
                <a
                  href
                  onClick={() => {
                    push({
                      pathname: `/${getUserSlug(book.author)}/${
                        book.slug
                      }/edit`,
                      state: { book },
                    })
                  }}
                >
                  Edit book
                </a>
              </li>
            )}
            <li>
              <a href onClick={() => setShowDeleteConfirmation(true)}>
                Delete book
              </a>
            </li>
          </ul>
        </div>
      </div>
      {showDeleteConfirmation && (
        <ConfirmationModal
          show={showDeleteConfirmation}
          close={() => {
            setShowDeleteConfirmation(false)
            hide()
          }}
          onDelete={() => {
            onDelete()
            setShowDeleteConfirmation(false)
            push(`/`)
          }}
        />
      )}
    </div>
  )
}
