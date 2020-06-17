import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from 'urql'
import { getBookQuery } from 'api'

import Loader from 'components/Loader'
import Rating from 'components/Rating'
import Comments from 'components/Comments'
import Flex from 'components/Flex'

import * as S from './Book.styled'

const Chapters = ({ book }) => {
  const { push } = useHistory()

  return (
    <S.Chapters>
      {book.chapters.map((chapter, index) => (
        <S.Chapter>
          <S.Label
            onClick={() => push(`/books/${book.id}/${index + 1}`)}
          >{`Chapter ${index + 1}`}</S.Label>
          <S.Title
            key={chapter.id}
            to={`/books/${book.id}/${index + 1}`}
            style={{ fontWeight: '400' }}
          >
            {chapter.title}
          </S.Title>
        </S.Chapter>
      ))}
    </S.Chapters>
  )
}

// {book.chapters
//   .filter((chapter) => chapter.voices.length > 0)
//   .map((chapter, index) => (
//     <S.Chapter key={chapter.id} to={`/books/${book.id}/${index + 1}`}>
//       {chapter.title}
//     </S.Chapter>
//   ))}
const Episodes = ({ book }) => (
  <S.Chapters>
    {book.chapters.map((chapter, index) => (
      <S.Episode>
        <S.Title key={chapter.id} to={`/books/${book.id}/${index + 1}`}>
          {index + 1}. {chapter.title}
        </S.Title>
      </S.Episode>
    ))}
  </S.Chapters>
)

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
                    <S.Author>Author</S.Author>
                  </S.ByAuthor>
                  {/*
                <S.Author>{`by ${book.author.username}`}</S.Author>
                */}
                </Flex>
                <Rating ratings={book.ratings} />
              </Flex>
              {/*
            <S.Description>{book.description}</S.Description>
            */}
              <S.Description>
                When Ryan Glasser, (an Emo kid by heart) Dies after having a
                good day at school, turn horribly bad, he is forced to Stand
                before his maker. With Ryan Thinking life was just a game he
                could just throw away without any Consequences, He gets
                sentenced to live his next life in a a real life RPG world full
                of Swords, Magic, Misery, and Mondays with nothing but a
                Cellphone full of his Music to get by in this Afterlife.
                <S.Break />
                This wonderful place seems like perfect place to spend eternity
                right? Well, Not exactly.
                <S.Break />
                This place is supposed to be an alternative to going to hell,
                but due to some unforeseen circumstances and events that are
                going to unfold on him, Ryan
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
