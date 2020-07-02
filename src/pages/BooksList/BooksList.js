import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'urql'
import { getBooksQuery } from 'api'

import Loader from 'components/Loader'
import Rating from 'components/Rating'

import * as S from './BooksList.styled'

const Book = ({ book }) => {
  const { push } = useHistory()

  return (
    <S.Book onClick={() => push(`/books/${book.id}`)}>
      <S.Image
        src={
          book.image ||
          'https://www.royalroadcdn.com/covers/32502-heart-of-cultivation-full.jpg?time=1591047951'
        }
        alt={book.name}
      />
      <S.Details>
        <S.Name>{book.name}</S.Name>
        <Rating ratings={book.reviews} readOnly quiet />
      </S.Details>
    </S.Book>
  )
}

export default () => {
  const [{ data: { books } = {}, fetching, error }] = useQuery({
    query: getBooksQuery,
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <S.Container>
      {books.map((book) => (
        <Book book={book} key={book.id} />
      ))}
    </S.Container>
  )
}
