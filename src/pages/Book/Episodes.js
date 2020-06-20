import React, { useEffect, useContext } from 'react'
import useSound from 'use-sound'
import { PlayerContext } from 'context'
import * as S from './Book.styled'

const Player = ({ voice }) => {
  const {
    playing,
    playingId,
    play: contextPlay,
    stop: contextStop,
  } = useContext(PlayerContext)
  const [play, { pause, isPlaying }] = useSound(
    `https://cors-anywhere.herokuapp.com/${voice.url}`,
    {
      volume: 1,
      interrupt: false,
    },
  )

  useEffect(() => {
    if (playing && playingId === voice.id && !isPlaying) play()
    if (playing && playingId !== voice.id && isPlaying) pause()
    if (!playing && playingId === voice.id) pause()
  }, [playing, playingId, voice, play, pause, isPlaying])

  return (
    <>
      {playing && playingId === voice.id ? (
        <S.Stop
          playing={isPlaying}
          onClick={() => {
            pause()
            contextStop()
          }}
        />
      ) : (
        <S.Play
          playing={isPlaying}
          onClick={() => {
            play()
            contextPlay(voice.id)
          }}
        />
      )}
    </>
  )
}

const Episode = ({ episode, index, bookId }) => {
  const voice = episode && episode.voices[0]
  console.log(episode)
  console.log(index)
  return (
    <S.Episode>
      {voice && <Player voice={voice} />}
      <S.Title key={episode.id} to={`/books/${bookId}/${index + 1}`}>
        {episode.title}
      </S.Title>
    </S.Episode>
  )
}

const Episodes = ({ book }) => {
  const episodes = book.chapters.filter((chapter) => chapter.voices.length > 0)
  // const episodes = book.chapters

  return (
    <S.Episodes>
      {episodes.length > 0 ? (
        episodes.map((episode, index) => (
          <Episode
            episode={episode}
            index={index}
            bookId={book.id}
            key={episode.id}
          />
        ))
      ) : (
        <S.Link to={`/books/${book.id}/1/text`}>Create first episode</S.Link>
      )}
    </S.Episodes>
  )
}

export default Episodes
