import React from 'react'

export default ({ children, show, hide, style }) =>
  show && (
    <div className="dropdown" style={style || {}}>
      {children}
    </div>
  )
