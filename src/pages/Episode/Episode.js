import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from 'urql'
import { getChapterByBookQuery } from 'api'

import Loader from 'components/Loader'
import Rating from 'components/Rating'
import Player from 'components/Player'
import VoiceActors from 'components/VoiceActors'
import Comments from 'components/Comments'
import Flex from 'components/Flex'

import * as S from './Episode.styled'

// Episode - is an audio version of chapter

export default () => {
  const [showComments, setShowComments] = useState(false)
  let { book: bookId, chapter: chapterPage, voice: voiceId } = useParams()
  const { pathname } = useHistory()

  const [{ data: { chapterByBook = [] } = {}, fetching, error }] = useQuery({
    query: getChapterByBookQuery,
    variables: {
      bookId: parseInt(bookId),
      skip: parseInt(chapterPage) - 1,
    },
  })
  const chapter = chapterByBook[0]

  useEffect(() => {
    if (voiceId) {
      // play()
    }
  }, [])

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  console.log(chapter.id)
  return (
    <S.Container>
      <S.Episode column spaceBetween>
        <Flex row spaceBetween alignCenter>
          <S.Title>{chapter.title}</S.Title>
          <Rating ratings={chapter.ratings} chapterId={chapter.id} />
        </Flex>
        <Flex row spaceBetween alignEnd>
          <Player
            initial={chapter.voices.length > 0 ? chapter.voices[0].id : null}
          />
          <VoiceActors voices={chapter.voices} />
        </Flex>
      </S.Episode>
      {showComments ? (
        <Comments id={`book${bookId}episode${chapter.id}`} />
      ) : (
        <Flex row justifyEnd>
          <button onClick={() => setShowComments(true)}>Show comments</button>
        </Flex>
      )}
    </S.Container>
  )
}
