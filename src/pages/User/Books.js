import React from 'react'
import { useHistory } from 'react-router-dom'
import Rating from 'components/Rating'

import * as S from './Books.styled'

const Book = ({ book }) => {
  const { push } = useHistory()

  return (
    <S.Book onClick={() => push(`/books/${book.id}`)}>
      <S.Image src={book.image || '/img/placeholder.jpg'} alt={book.name} />
      <S.Details>
        <S.Name>{book.name}</S.Name>
        <Rating ratings={book.reviews} readOnly quiet />
      </S.Details>
    </S.Book>
  )
}

export default ({ books }) => {
  return (
    <S.Container>
      {books.map((book) => (
        <Book book={book} key={book.id} />
      ))}
    </S.Container>
  )
}
