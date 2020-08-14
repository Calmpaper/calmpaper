import React from 'react'

export default ({ onDelete, hide }) => (
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
)
