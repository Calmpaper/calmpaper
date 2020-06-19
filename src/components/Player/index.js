import React, { useContext } from 'react'
import { PlayerContext } from 'context'
import * as S from './styled'

export default ({ initial }) => {
  const { playing, playingId, play, stop } = useContext(PlayerContext)

  return (
    <div>
      {playing ? (
        <S.Stop onClick={stop}>
          <S.StopIcon />
        </S.Stop>
      ) : (
        <S.Play onClick={() => play(playingId || initial)}>
          <S.PlayIcon />
        </S.Play>
      )}
    </div>
  )
}
