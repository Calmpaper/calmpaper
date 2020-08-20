import React, { useState } from 'react'
import { useMutation } from 'urql'
import { useHistory } from 'react-router-dom'
import { deleteBookMutation } from 'api'

import ConfirmationModal from 'components/ConfirmationModal'

export default ({ bookId, book, hide }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const { push } = useHistory()

  // eslint-disable-next-line no-unused-vars
  const [__, deleteBook] = useMutation(deleteBookMutation)
  const onDelete = () => deleteBook({ id: bookId })

  return (
    <div style={{ position: 'absolute' }}>
      <div className="zen-ui-context-menu" style={{ background: 'white' }}>
        <button
          type="button"
          className="zen-ui-context-menu__item comment-menu-item _edit"
          onClick={() => {
            push({ pathname: `/books/${bookId}/edit`, state: { book } })
            // hide()
          }}
        >
          <span className="zen-ui-context-menu__item-icon-container">
            <svg
              className="comment-menu-item__icon comment-menu-item__icon_fill zen-ui-context-menu__item-icon"
              viewBox="0 0 18 18"
            >
              <use xlinkHref="#edit-icon-small--inline" />
            </svg>
          </span>
          <span className="zen-ui-context-menu__item-text-container">
            <span className="zen-ui-context-menu__item-text">Edit</span>
          </span>
        </button>
        <button
          type="button"
          className="zen-ui-context-menu__item comment-menu-item _remove"
          onClick={() => setShowDeleteConfirmation(true)}
        >
          <span className="zen-ui-context-menu__item-icon-container">
            <svg
              className="comment-menu-item__icon comment-menu-item__icon_fill zen-ui-context-menu__item-icon"
              viewBox="0 0 18 18"
            >
              <use xlinkHref="#bin-s--inline" />
            </svg>
          </span>
          <span className="zen-ui-context-menu__item-text-container">
            <span
              className="zen-ui-context-menu__item-text"
              style={{ color: '#f00' }}
            >
              Delete
            </span>
          </span>
        </button>
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
