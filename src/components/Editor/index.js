import React, { useState, useEffect } from 'react'
import Icons from './Icons'

// export default ({ value, setValue }) => {
export default ({
  value,
  onChange,
  style = {},
  hideIcons = false,
  className = '',
}) => {
  // const [value, setValue] = useState('')

  useEffect(() => {
    let editor = document.createElement('calmpaper-editor')
    let script = document.createElement('script')
    let css = document.createElement('link')

    editor.value = value
    editor.setValue = onChange
    script.src = 'https://editor-9i1815j4m.vercel.app/js/app.97cc8a29.js'
    css.rel = 'stylesheet'
    css.href = 'https://editor-9i1815j4m.vercel.app/css/app.ee41d9fb.css'

    document.getElementById('editor-portal').appendChild(editor)
    document.body.appendChild(script)
    document.head.appendChild(css)
  }, [])

  useEffect(() => {
    // console.log('value:', value)
  }, [value])

  return (
    <div
      id="editor-portal"
      className={className}
      style={{
        // position: 'absolute',
        // top: 48,
        // left: 48,
        border: '1px solid rgb(134 134 134)',
        padding: '16px',
        borderRadius: '6px',
        minHeight: '180px',
        ...style,
      }}
    >
      <Icons />
    </div>
  )
}
