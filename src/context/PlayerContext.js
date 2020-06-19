import React, { useState, createContext } from 'react'

import track1 from '../assets/tracks/Anthony Rother - Automat.mp3'
import track2 from '../assets/tracks/Dreams - Not Phazed (APRON33).mp3'
import track3 from '../assets/tracks/Fakundo Ed - Kontent 3000.mp3'
import track4 from '../assets/tracks/Yunzero _Angel 2_.mp3'
import track5 from '../assets/tracks/Hidden Valley Logging Company - _2,000ft_.mp3'

const PlayerContext = createContext()

const initial = [
  { id: 1, username: 'ignatif', src: track1 },
  { id: 2, username: 'lovivibe', src: track2 },
  { id: 3, username: 'ton', src: track3 },
  { id: 4, username: 'rahul', src: track4 },
  { id: 5, username: 'ivan', src: track5 },
]

const PlayerProvider = ({ children }) => {
  const [voices, setVoices] = useState(initial)
  const [playing, setPlaying] = useState(false)
  const [playingId, setPlayingId] = useState(false)

  const play = (voiceId) => {
    setPlaying(true)
    setPlayingId(voiceId || playingId)
  }

  const stop = () => {
    setPlaying(false)
  }

  return (
    <PlayerContext.Provider
      value={{
        play,
        stop,
        playing,
        playingId,
        voices,
        setVoices,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export { PlayerProvider as default, PlayerContext }
