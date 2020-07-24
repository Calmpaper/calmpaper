import React, { useState } from 'react'

import Edit from './edit'
import Delete from './delete'

const MoreIcon = ({ onClick }) => (
  <button className="comment-context-menu__button" onClick={onClick}>
    <svg viewBox="0 0 18 18" className="comment-context-menu__icon">
      <use xlinkHref="#dots-s--inline" />
    </svg>
  </button>
)

export default ({ onEdit, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <>
      <MoreIcon onClick={() => setShowDropdown(!showDropdown)} />
      {showDropdown && (
        <div style={{ position: 'absolute' }}>
          <div className="zen-ui-context-menu" style={{ background: 'white' }}>
            <Edit onEdit={onEdit} hide={() => setShowDropdown(false)} />
            <Delete onDelete={onDelete} hide={() => setShowDropdown(false)} />
          </div>
        </div>
      )}
    </>
  )
}
