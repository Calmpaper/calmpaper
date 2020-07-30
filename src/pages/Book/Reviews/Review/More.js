import React, { useState } from 'react'
import { useMutation } from 'urql'
import { deleteCommentMutation } from 'api'

const MoreMenu = ({ setEditing, hide, onDelete }) => {
  return (
    <div style={{ position: 'absolute' }}>
      <div className="zen-ui-context-menu" style={{ background: 'white' }}>
        <button
          type="button"
          className="zen-ui-context-menu__item comment-menu-item _edit"
          onClick={() => {
            setEditing(true)
            hide()
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
          onClick={() => {
            onDelete()
            hide()
          }}
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
    </div>
  )
}

export default ({ setEditing, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <>
      <button
        className="comment-context-menu__button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <svg viewBox="0 0 18 18" className="comment-context-menu__icon">
          <use xlinkHref="#dots-s--inline" />
        </svg>
      </button>
      {showDropdown && (
        <MoreMenu
          setEditing={setEditing}
          hide={() => setShowDropdown(false)}
          onDelete={onDelete}
        />
      )}
    </>
  )
}
