import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getChapterQuery } from 'api'

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
  let { chapter: chapterId } = useParams()

  const [{ data: { chapter } = {}, fetching, error }] = useQuery({
    query: getChapterQuery,
    variables: {
      id: parseInt(chapterId),
    },
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <S.Container>
      <S.Episode column spaceBetween>
        <Flex row spaceBetween alignCenter>
          <S.Title>{chapter.title}</S.Title>
          <Rating ratings={chapter.ratings} />
        </Flex>
        <Flex row spaceBetween alignEnd>
          <Player />
          <VoiceActors voices={chapter.voices} />
        </Flex>
      </S.Episode>
      {showComments ? (
        <Comments />
      ) : (
        <Flex row justifyEnd>
          <button onClick={() => setShowComments(true)}>Show comments</button>
        </Flex>
      )}
    </S.Container>
  )
}
