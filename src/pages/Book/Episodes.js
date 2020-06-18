import React from 'react'
import * as S from './Book.styled'

const Episodes = ({ book }) => {
  const episodes = book.chapters.filter((chapter) => chapter.voices.length > 0)

  return (
    <S.Episodes>
      {episodes.length > 0 ? (
        episodes.map((chapter, index) => (
          <S.Episode>
            <S.Title key={chapter.id} to={`/books/${book.id}/${index + 1}`}>
              {index + 1}. {chapter.title}
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
