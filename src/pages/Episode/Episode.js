import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getChapterQuery } from 'api'

import Loader from 'components/Loader'
import Rating from 'components/Rating'
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
      <S.Episode>
        <Flex row spaceBetween alignCenter>
          <S.Title>{chapter.title}</S.Title>
          <Rating ratings={chapter.ratings} />
        </Flex>
        <S.Play>play</S.Play>
        <S.Voices>
          {chapter.voices.map((voice) => (
            <S.Voice key={voice.id}>voice</S.Voice>
          ))}
        </S.Voices>
      </S.Episode>
      {showComments ? (
        <Comments />
      ) : (
        <Flex row justifyCenter>
          <button onClick={() => setShowComments(true)}>Show comments</button>
        </Flex>
      )}
    </S.Container>
  )
}
