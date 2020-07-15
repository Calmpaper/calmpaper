import React from 'react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const Avatar = styled.img`
  background-image: url("${(props) => props.src}");
  width: 38px;
  height: 38px;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0);
  user-select: none;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  margin-right: 8px;
  :hover {
    border-color: blue;
  }
  ${(props) => props.playing && 'border-color: #ae00ff;'}
`

const FILE_STORAGE_URL = process.env.REACT_APP_FILE_STORAGE_URL

const Input = ({
  a: { accept, onFiles, files, getFilesFromEvent } = {},
  avatar,
}) => {
  const text = files.length > 0 ? 'Add more files' : 'Choose files'

  return (
    <label>
      <Avatar src={avatar} />
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

const CustomInput = ({ avatar, setImage }) => {
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

      setImage(`${FILE_STORAGE_URL}/${path}`)
      // remove()
    }

    if (status === 'headers_received') {
      // remove()
    } else if (status === 'aborted') {
      alert(`${meta.name}, upload failed...`)
    }
  }

  // getUploadParams={() => ({ url: 'http://localhost:3000/files' })}
  return (
    <Dropzone
      accept="image/*"
      onChangeStatus={handleChangeStatus}
      getUploadParams={() => ({
        url: `${FILE_STORAGE_URL}`,
      })}
      onSubmit={handleSubmit}
      getFilesFromEvent={getFilesFromEvent}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent=""
      InputComponent={(a) => <Input a={a} avatar={avatar} />}
      SubmitButtonComponent={() => <div />}
    />
  )
}
// PreviewComponent={() => <div />}

// InputComponent={Input}

export default CustomInput
