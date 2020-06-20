import React, { useEffect, useContext } from 'react'
import { PlayerContext } from 'context'
import { useParams } from 'react-router-dom'
import useSound from 'use-sound'
import styled from 'styled-components'
import Flex from 'components/Flex'

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  margin-left: 8px;
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
const hashcode = (s) =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

const Actor = ({ voice }) => {
  let { chapter: chapterId, voice: voiceId } = useParams()
  const [play, { pause, isPlaying }] = useSound(
    `https://cors-anywhere.herokuapp.com/${voice.url}`,
    {
      volume: 1,
      interrupt: false,
    },
  )
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
    if (voiceId && parseInt(voiceId) === voice.id) {
      play()
      contextPlay(voice.id)
    }
  }, [])

  useEffect(() => {
    console.log(isPlaying)
  }, [isPlaying])

  useEffect(() => {
    if (playing && playingId === voice.id && !isPlaying) play()
    if (playing && playingId !== voice.id && isPlaying) pause()
    if (!playing && playingId === voice.id) pause()
  }, [playing, playingId, voice, play, pause, isPlaying])

  // <Link to="/new-story">
  //   <Btn right>Add Story</Btn>
  // </Link>
  return (
    <Avatar
      playing={isPlaying}
      src={`https://www.gravatar.com/avatar/${hashcode(
        voice.author.username,
      )}?d=robohash&f=y`}
      onClick={togglePlaying}
    />
  )
}

export default ({ voices }) => {
  return (
    <Flex row>
      {voices.map((voice) => {
        return <Actor voice={voice} key={voice.id} />
      })}
    </Flex>
  )
}
