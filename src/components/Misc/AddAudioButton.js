import React from 'react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const FILE_STORAGE_URL = process.env.REACT_APP_FILE_STORAGE_URL

const Button = styled.button`
  position: fixed;
  top: 36px;
  ${(props) => props.right && 'right: 64px'};
`

const Label = styled.label`
  padding: 3px 6px;
  margin: 0 -6px;
`

const UploadButton = ({ accept, onFiles, files, getFilesFromEvent }) => {
  return (
    <Button right>
      <Label>
        Add voice
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
      </Label>
    </Button>
  )
}

const Preview = ({ meta: { percent } }) => {
  return <button disabled>{Math.round(percent)}%</button>
}

const audio =
  'https://github.com/justinmc/react-audio-player/raw/master/example/files/George_Gershwin_playing_Rhapsody_in_Blue.ogg'

const AudioFileInput = ({ setVoice }) => {
  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove())
  }

  const getFilesFromEvent = (e) => {
    console.log('get files')
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        console.log(chosenFiles)
        resolve(chosenFiles.map((f) => f.fileObject))
      })
    })
  }

  const handleChangeStatus = (props, status) => {
    const { meta, xhr, remove } = props

    if (status === 'done') {
      const { path } = JSON.parse(xhr.response)
      setVoice(`${FILE_STORAGE_URL}/${path}`)
      remove()
    }

    if (status === 'headers_received') {
      // addVoice(audio)
      // remove()
    } else if (status === 'aborted') {
      alert(`${meta.name}, upload failed...`)
    }
  }

  // getUploadParams={() => ({ url: 'http://localhost:3000/files' })}
  return (
    <Dropzone
      accept="audio/*"
      onChangeStatus={handleChangeStatus}
      getUploadParams={() => ({
        url: `https://cors-anywhere.herokuapp.com/${FILE_STORAGE_URL}/files`,
      })}
      onSubmit={handleSubmit}
      getFilesFromEvent={getFilesFromEvent}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      InputComponent={UploadButton}
      PreviewComponent={Preview}
      SubmitButtonComponent={() => <div />}
    />
  )
}

export default AudioFileInput
