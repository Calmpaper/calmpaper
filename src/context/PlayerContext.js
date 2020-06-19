import React, { useState, createContext } from 'react'

const PlayerContext = createContext()

const PlayerProvider = ({ children }) => {
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export { PlayerProvider as default, PlayerContext }
