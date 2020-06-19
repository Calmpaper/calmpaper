import React, { useContext } from 'react'
import { PlayerContext } from 'context'
import * as S from './Book.styled'

const Episodes = ({ book }) => {
  const { playing, playingId, play, stop } = useContext(PlayerContext)
  // const episodes = book.chapters.filter((chapter) => chapter.voices.length > 0)
  const episodes = book.chapters

  return (
    <S.Episodes>
      {episodes.length > 0 ? (
        episodes.map((episode, index) => (
          <S.Episode>
            {playing && playingId === episode.voices[index] ? (
              <S.Stop onClick={stop} />
            ) : (
              <S.Play
                onClick={() =>
                  play(episode.voices[index] && episode.voices[index].id)
                }
              />
            )}
            <S.Title key={episode.id} to={`/books/${book.id}/${index + 1}`}>
              {episode.title}
            </S.Title>
          </S.Episode>
        ))
      ) : (
        <S.Link to={`/books/${book.id}/1/text`}>Create first episode</S.Link>
      )}
    </S.Episodes>
  )
}

export default Episodes
