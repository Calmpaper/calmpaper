import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
  const text = files.length > 0 ? 'Add more files' : 'Choose files'

  return (
    <label className="input btn-add-img">
      <div>
        <svg className="icon icon-plus">
          <use xlinkHref="#icon-plus" />
        </svg>
        <span className="btn-add-img__title">
          400x600 pixels is recommended
        </span>
      </div>
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

const CustomInput = ({ setImage }) => {
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
    const { meta, xhr } = props

    if (status === 'done') {
      const { path } = JSON.parse(xhr.response)
      setImage(`${BACKEND_URL}/${path}`)

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
      SubmitButtonComponent={() => <div />}
      InputComponent={Input}
    />
  )
}
// PreviewComponent={() => <div />}

// InputComponent={Input}

export default CustomInput
