import React, { useContext } from 'react'
import { UserContext } from 'context'
import { useQuery } from 'urql'
import { getBookQuery } from 'api'
import { Link } from 'react-router-dom'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

const Btn = styled.button`
  position: fixed;
  top: 36px;
  ${(props) => props.left && 'left: 64px'};
  ${(props) => props.right && 'right: 64px'};
`

const Join = () => {
  const { setUser } = useContext(UserContext)

  return (
    <Btn
      right
      onClick={() => setUser({ name: 'Andre' })}
      style={{
        background: 'blue',
        color: 'white',
        border: '4px solid blue',
        padding: '0 12px',
        cursor: 'pointer',
        marginTop: -1,
        outline: 'none',
      }}
    >
      Join
    </Btn>
  )
}

const AddBook = () => {
  return (
    <Link to="/new-story">
      <Btn right>Add Story</Btn>
    </Link>
  )
}

const AddChapter = ({ book }) => {
  return (
    <Link to={`/books/${book}/new-chapter`}>
      <Btn right>Add Chapter</Btn>
    </Link>
  )
}

const Back = () => {
  const { goBack } = useHistory()

  return (
    <Btn left onClick={goBack}>
      Back
    </Btn>
  )
}

const BackToBooks = () => {
  return (
    <Link to="/">
      <Btn left>Books</Btn>
    </Link>
  )
}

const BackToBook = ({ bookId }) => {
  const [{ data: { book } = {} }] = useQuery({
    query: getBookQuery,
    variables: {
      id: parseInt(bookId),
    },
  })

  if (!book) return null

  return (
    <Link to={`/books/${bookId}`}>
      <Btn left>{book.name}</Btn>
    </Link>
  )
}

const NextEpisode = ({ bookId, chapterPage }) => {
  return (
    <Link to={`/books/${bookId}/${parseInt(chapterPage) + 1}`}>
      <Btn right>Next Episode</Btn>
    </Link>
  )
}

const AddVoice = ({ bookId, chapterPage }) => {
  return (
    <Link to={`/books/${bookId}/${parseInt(chapterPage) + 1}/text`}>
      <Btn right>Add voice</Btn>
    </Link>
  )
}

export default ({ children }) => {
  const { user } = useContext(UserContext)
  const { pathname } = useLocation()
  const bookMatch = useRouteMatch('/books/:book')
  const episodesMatch = useRouteMatch('/books/:book/episodes')
  const chaptersMatch = useRouteMatch('/books/:book/chapters')
  const episodeMatch = useRouteMatch('/books/:book/:chapter')
  const chapterMatch = useRouteMatch('/books/:book/:chapter/text')

  const showNextEpisode =
    episodeMatch &&
    episodeMatch.isExact &&
    episodeMatch.params.chapter !== 'episodes' &&
    episodeMatch.params.chapter !== 'chapters'
  const showNextChapter = chapterMatch
  const showBackToBook = showNextEpisode
  const showBackToBooks =
    (bookMatch && bookMatch.isExact) || episodesMatch || chaptersMatch
  // const showAddVoice = showNextEpisode
  const showBack = pathname !== '/' && !showBackToBooks && !showBackToBook
  const showAddBook = user && pathname === '/'
  const showAddChapter =
    user && ((bookMatch && bookMatch.isExact) || episodesMatch || chaptersMatch)
  const showJoin = !user && !showNextEpisode && !showNextChapter

  return (
    <div>
      {showJoin && <Join />}
      {showBack && <Back />}
      {showBackToBooks && <BackToBooks />}
      {showBackToBook && <BackToBook bookId={episodeMatch.params.book} />}
      {showNextEpisode && (
        <NextEpisode
          bookId={episodeMatch.params.book}
          chapterPage={episodeMatch.params.chapter}
        />
      )}

      {showNextChapter && (
        <AddVoice
          bookId={episodeMatch.params.book}
          chapterPage={episodeMatch.params.chapter}
        />
      )}

      {showAddBook && <AddBook />}
      {showAddChapter && <AddChapter book={bookMatch.params.book} />}
      {children}
    </div>
  )
}
