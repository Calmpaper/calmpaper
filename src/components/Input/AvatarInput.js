import React from 'react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const Avatar = styled.img.attrs({
  className: 'user-avatar',
})`
  object-position: top;
  object-fit: cover;
  ${(props) => props.playing && 'border-color: #ae00ff;'}
`

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const Input = ({
  a: { accept, onFiles, files, getFilesFromEvent } = {},
  avatar,
  style,
}) => {
  const text = files.length > 0 ? 'Add more files' : 'Choose files'

  return (
    <label>
      <Avatar src={avatar} style={style} />
      <input
        style={{ display: 'none' }}
        type="file"
        accept={accept}
        multiple
        onChange={(e) => {
          getFilesFromEvent(e).then((chosenFiles) => {
            onFiles(chosenFiles)
          })
        }}
      />
    </label>
  )
}

const CustomInput = ({ avatar, setImage, style = {} }) => {
  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove())
  }

  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject))
      })
    })
  }

  const handleChangeStatus = (props, status) => {
    const { meta, xhr, remove } = props

    if (status === 'done') {
      const { path } = JSON.parse(xhr.response)

      setImage(`${BACKEND_URL}/${path}`)
      // document.getElementsByTagName('progress')[0].style.display = 'none'
      // remove()
    }

    if (status === 'headers_received') {
      // remove()
    } else if (status === 'aborted') {
      alert(`${meta.name}, upload failed...`)
    }
  }

  return (
    <Dropzone
      accept="image/*"
      onChangeStatus={handleChangeStatus}
      getUploadParams={() => ({
        url: `${BACKEND_URL}/files`,
      })}
      onSubmit={handleSubmit}
      getFilesFromEvent={getFilesFromEvent}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent=""
      InputComponent={(a) => <Input a={a} avatar={avatar} style={style} />}
      PreviewComponent={({ meta }) => {
        console.log(meta)
        return (
          <img className="user-avatar" src={meta.previewUrl} alt="Avatar" />
        )
      }}
      SubmitButtonComponent={() => <div />}
    />
  )
}

// InputComponent={Input}

export default CustomInput
