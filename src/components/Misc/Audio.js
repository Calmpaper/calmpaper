import React, { useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import AddAudioButton from 'components/AddAudioButton'

export default () => {
  const [voices, setVoices] = useState([])
  const addVoice = (voice) => setVoices((v) => [...v, voice])

  return (
    <div className="voices">
      {voices.length > 0 &&
        voices.map((voice) => (
          <ReactAudioPlayer src={voice} key={voice} controls />
        ))}
      <AddAudioButton addVoice={addVoice} />
    </div>
  )
}
