import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getBookQuery } from 'api'

import Loader from 'components/Loader'
import Rating from 'components/Rating'
import Comments from 'components/Comments'
import Flex from 'components/Flex'

import Episodes from './Episodes'
import Chapters from './Chapters'
import * as S from './Book.styled'

export default ({ tab }) => {
  const { book: bookId } = useParams()

  const [{ data: { book } = {}, fetching, error }] = useQuery({
    query: getBookQuery,
    variables: {
      id: parseInt(bookId),
    },
  })

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  console.log('book')
  console.log(book)

  return (
    <S.Container>
      <S.BookWrapper>
        <S.Book>
          <Flex row alignCenter>
            <S.Image
              src="https://www.royalroadcdn.com/covers/32502-heart-of-cultivation-full.jpg?time=1591047951"
              alt={book.name}
            />
            <S.Details>
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
              {/*
            <S.Description>{book.description}</S.Description>
            */}
              <S.Description>
                Aumee is known as 'wannfota' by many in the Waystland: the bird
                with black feet. She is owned by Daya, a renowned witch who
                trains young women as her spies before selling them off as
                wives. In order to maintain what little freedom she has as
                Daya's assassin, she obeys any and all commands with no
                questions asked.
                <S.Break />
                That changes when Aumee senses that Daya is after something
                important. After bargaining her freedom for the spellbook that
                Daya is after, Aumee is determined to find the book no matter
                the costs.
                <S.Break />
                All she has to do is track down a spellbook, but she soon finds
                that her desire for freedom is further from her reach than she
                had ever thought. Forced to work with Daya's cursed informant,
                Fal, Aumee must bargain with a set of twins who own the book in
                order to fulfill her end of the deal.
              </S.Description>

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
      <Comments />
    </S.Container>
  )
}
