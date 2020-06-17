import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const SERVER_URL = 'http://localhost:4000'
// const SERVER_URL = 'http://ec2-52-87-215-106.compute-1.amazonaws.com:3000'

const audio =
  'https://github.com/justinmc/react-audio-player/raw/master/example/files/George_Gershwin_playing_Rhapsody_in_Blue.ogg'

const CustomInput = ({ addVoice }) => {
  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove())
    addVoice(audio)
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
    console.log(status)
    console.log(props)

    if (status === 'done') {
      const { path } = JSON.parse(xhr.response)
      console.log(path)
      // addVoice(`${SERVER_URL}/${path}`)
      // remove()
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
      accept="image/*"
      onChangeStatus={handleChangeStatus}
      getUploadParams={() => ({
        url: `${SERVER_URL}/files`,
      })}
      onSubmit={handleSubmit}
      getFilesFromEvent={getFilesFromEvent}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent=""
      SubmitButtonComponent={() => <div />}
      PreviewComponent={() => <div />}
    />
  )
}

// InputComponent={Input}

export default CustomInput
