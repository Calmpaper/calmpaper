import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from 'urql'
import { getBookQuery } from 'api'

import Loader from 'components/Loader'
import Rating from 'components/Rating'
import Comments from 'components/Comments'
import Flex from 'components/Flex'

import Episodes from './Episodes'
import Chapters from './Chapters'
import * as S from './Book.styled'

export default ({ tab, update }) => {
  const { book: bookId } = useParams()
  const { pathname } = useHistory()

  const [{ data: { book } = {}, fetching, error }, execute] = useQuery({
    pause: !bookId,
    query: getBookQuery,
    variables: {
      id: parseInt(bookId),
    },
  })

  useEffect(() => {
    if (update) {
      execute()
    }
  }, [])

  // useEffect(() => {
  //   if (book) {
  //     execute()
  //   }
  //   // execute({ requestPolicy: 'network-only' })()
  // }, [book])

  useEffect(() => {
    if (book && book.chapters && book.chapters.length > 0) {
      // console.log(book.chapters)
    }
  }, [book])

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <S.Container>
      <S.BookWrapper>
        <S.Book>
          <Flex row alignCenter>
            <S.Image
              src={
                book.image ||
                'https://www.royalroadcdn.com/covers/32502-heart-of-cultivation-full.jpg?time=1591047951'
              }
              alt={book.name}
            />
            <S.Details style={{ minHeight: 288 }}>
              <Flex row spaceBetween>
                <Flex column>
                  <S.Name>{book.name}</S.Name>
                  <S.ByAuthor>
                    by
                    <S.Author to={`/users/${book.author.username}`}>
                      {book.author.username}
                    </S.Author>
                  </S.ByAuthor>
                </Flex>
                <Rating ratings={book.ratings} bookId={book.id} />
              </Flex>
              <S.Description>{book.description}</S.Description>
              {book.chapters.length > 0 && (
                <>
                  <S.Tabs>
                    <S.Tab
                      selected={tab === 'episodes'}
                      to={`/books/${book.id}/episodes`}
                    >
                      Episodes
                    </S.Tab>
                    <S.Tab
                      selected={tab === 'chapters'}
                      to={`/books/${book.id}/chapters`}
                    >
                      Table of Content
                    </S.Tab>
                  </S.Tabs>
                  {tab === 'episodes' && <Episodes book={book} />}
                  {tab === 'chapters' && <Chapters book={book} />}
                </>
              )}
            </S.Details>
          </Flex>
        </S.Book>
      </S.BookWrapper>
      <Comments id={`book${book.id}`} />
    </S.Container>
  )
}
