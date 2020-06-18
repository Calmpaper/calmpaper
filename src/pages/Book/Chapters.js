import React from 'react'
import * as S from './Book.styled'

const Chapters = ({ book }) => {
  return (
    <S.Chapters>
      {book.chapters.map((chapter, index) => (
        <S.Chapter>
          <S.Label>{`Chapter ${index + 1}`}</S.Label>
          <S.Title
            key={chapter.id}
            to={`/books/${book.id}/${index + 1}/text`}
            style={{ fontWeight: '400' }}
          >
            {chapter.title}
          </S.Title>
        </S.Chapter>
      ))}
    </S.Chapters>
  )
}

export default Chapters
