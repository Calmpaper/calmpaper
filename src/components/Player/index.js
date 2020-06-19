import React, { useContext } from 'react'
import { PlayerContext } from 'context'
import * as S from './styled'

export default ({ initial: initialVoice }) => {
  const { playing, playingId, play, stop } = useContext(PlayerContext)

  console.log(playingId)
  console.log(initialVoice)
  return (
    <div>
      {playing ? (
        <S.Stop onClick={stop}>
          <S.StopIcon />
        </S.Stop>
      ) : (
        <S.Play onClick={() => play(playingId || initialVoice)}>
          <S.PlayIcon />
        </S.Play>
      )}
    </div>
  )
}
