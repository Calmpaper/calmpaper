import React, { useState, useEffect, useContext } from 'react'
import useSound from 'use-sound'
import { PlayerContext } from 'context'
import styled from 'styled-components'
import Flex from 'components/Flex'

import track1 from '../assets/tracks/Anthony Rother - Automat.mp3'
import track2 from '../assets/tracks/Dreams - Not Phazed (APRON33).mp3'
import track3 from '../assets/tracks/Fakundo Ed - Kontent 3000.mp3'
import track4 from '../assets/tracks/Yunzero _Angel 2_.mp3'
import track5 from '../assets/tracks/Hidden Valley Logging Company - _2,000ft_.mp3'

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 8px;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0);
  user-select: none;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  :hover {
    border-color: blue;
  }
  ${(props) => props.playing && 'border-color: #ae00ff;'}
`
// filter: hue-rotate(0.3turn);

const hashcode = (s) =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

const voices = [
  { id: 1, username: 'ignatif', src: track1 },
  { id: 2, username: 'lovivibe', src: track2 },
  { id: 3, username: 'ton', src: track3 },
  { id: 4, username: 'rahul', src: track4 },
  { id: 5, username: 'ivan', src: track5 },
]

const Actor = ({ voice }) => {
  const [play, { pause, isPlaying }] = useSound(voice.src, {
    volume: 0.2,
    interrupt: false,
  })
  const {
    playing,
    play: contextPlay,
    stop: contextStop,
    playingId,
  } = useContext(PlayerContext)
  const togglePlaying = () => {
    if (isPlaying) {
      pause()
      contextStop()
    } else {
      play()
      contextPlay(voice.id)
    }
  }

  useEffect(() => {
    if (playing && playingId === voice.id && !isPlaying) play()
    if (playing && playingId !== voice.id && isPlaying) pause()
    if (!playing && playingId === voice.id) pause()
  }, [playing, playingId, voice, play, pause, isPlaying])

  return (
    <Avatar
      playing={isPlaying}
      src={`https://www.gravatar.com/avatar/${hashcode(
        voice.username,
      )}?d=robohash&f=y`}
      onClick={togglePlaying}
    />
  )
}

// voices
export default ({}) => {
  return (
    <Flex row>
      {voices.map((voice) => {
        return <Actor voice={voice} key={voice.id} />
      })}
    </Flex>
  )
}
