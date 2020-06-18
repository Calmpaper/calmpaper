import React, { useState, useRef, useEffect } from 'react'
import A1 from './123.mp3'
import * as S from './styled'

export default () => {
  const [isLoaded, setLoaded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const sampler = useRef(null)

  useEffect(() => {
    // sampler.current = new Sampler(
    //   { A1 },
    //   {
    //     onload: () => {
    //       setLoaded(true)
    //     },
    //   },
    // ).toMaster()
  }, [])

  const handleClick = () => sampler.current.triggerAttack('A1')

  return (
    <div>
      <div onClick={handleClick}>
        {playing ? (
          <S.Stop onClick={() => setPlaying(false)}>
            <S.StopIcon />
          </S.Stop>
        ) : (
          <S.Play onClick={() => setPlaying(true)}>
            <S.PlayIcon />
          </S.Play>
        )}
      </div>
    </div>
  )
}
