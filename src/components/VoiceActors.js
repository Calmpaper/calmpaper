import React, { useState } from 'react'
import useSound from 'use-sound'
import styled from 'styled-components'
import Flex from 'components/Flex'

import cadilac from '../components/Player/123.mp3'

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 8px;
  border-radius: 100%;
  border: 1px solid transparent;
  user-select: none;
  :hover {
    border-color: #ae00ff;
  }
`

const Actor = ({ voice }) => {
  const [play, { pause, stop, isPlaying, duration }] = useSound(cadilac)
  const togglePlaying = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }
  const avatar = new window.Pictogrify(voice, 'monsters')
  console.log(duration)

  return <Avatar src={avatar.base64} onClick={togglePlaying} />
}

export default ({ voices }) => {
  return (
    <Flex row>
      {['Ksaj', 220, 'asd', 'tyooyoyo', 'ada'].map((voice) => {
        return <Actor voice={voice} key={voice.id} />
      })}
    </Flex>
  )
}
