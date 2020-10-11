import React, { useState, useEffect } from 'react'
import Icons from './Icons'

// export default ({ value, setValue }) => {
export default ({ value, onChange, style = {} }) => {
  // const [value, setValue] = useState('')

  useEffect(() => {
    let editor = document.createElement('calmpaper-editor')
    let script = document.createElement('script')
    let css = document.createElement('link')

    editor.value = value
    editor.setValue = onChange
    script.src = 'https://editor.ignatif.vercel.app/js/app.be017bc5.js'
    css.rel = 'stylesheet'
    css.href = 'https://editor.ignatif.vercel.app/css/app.9a6da66a.css'

    document.getElementById('editor-portal').appendChild(editor)
    document.body.appendChild(script)
    document.head.appendChild(css)
  }, [])

  useEffect(() => {
    console.log('value:', value)
  }, [value])

  return (
    <div
      id="editor-portal"
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
