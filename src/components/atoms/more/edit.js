import React from 'react'

export default ({ onEdit, hide }) => (
  <button
    type="button"
    className="zen-ui-context-menu__item comment-menu-item _edit"
    onClick={() => {
      onEdit()
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
)
