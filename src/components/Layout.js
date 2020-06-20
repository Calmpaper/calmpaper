import React, { useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { ModalContext } from 'context'
import { useHistory, useLocation, useRouteMatch, Link } from 'react-router-dom'
import { useQuery } from 'urql'
import { getBookQuery } from 'api'
import styled from 'styled-components'

const Btn = styled.button`
  position: fixed;
  top: 36px;
  ${(props) => props.left && 'left: 64px'};
  ${(props) => props.right && 'right: 64px'};
  ${(props) =>
    props.blue &&
    ` background: blue;
      color: white;
      border: 4px solid blue;
      padding: 0 12px;
      cursor: pointer;
      marginTop: -1px;
      outline: none;
  `}
`

const Filter = styled.div`
  ${(props) => props.blurred && 'filter: blur(3px);'};
`

const Join = () => {
  const { setShowModal } = useContext(ModalContext)

  return (
    <Btn right onClick={() => setShowModal(true)} blue>
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
  const [{ data: { book } = {} }] = useQuery({
    query: getBookQuery,
    variables: {
      id: parseInt(bookId),
    },
  })

  if (!book) return null
  if (book.chapters.length === parseInt(chapterPage)) return null

  return (
    <Link to={`/books/${bookId}/${parseInt(chapterPage) + 1}`}>
      <Btn right>Next Episode</Btn>
    </Link>
  )
}

const AddVoice = ({ bookId, chapterPage }) => {
  return null
  return (
    <Link to={`/books/${bookId}/${parseInt(chapterPage) + 1}/text`}>
      <Btn right>Add voice</Btn>
    </Link>
  )
}

export default ({ children }) => {
  const { user } = useContext(UserContext)
  const { showModal } = useContext(ModalContext)
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
  // const showJoin = !!user

  return (
    <div>
      {showBack && <Back />}
      {!showJoin ? (
        <>
          {showAddBook && <AddBook />}
          {showAddChapter && <AddChapter book={bookMatch.params.book} />}
          {showNextChapter && (
            <AddVoice
              bookId={episodeMatch.params.book}
              chapterPage={episodeMatch.params.chapter}
            />
          )}
        </>
      ) : (
        <Join />
      )}
      {showBackToBooks && <BackToBooks />}
      {showBackToBook && <BackToBook bookId={episodeMatch.params.book} />}
      {showNextEpisode && (
        <NextEpisode
          bookId={episodeMatch.params.book}
          chapterPage={episodeMatch.params.chapter}
        />
      )}

      <Filter blurred={showModal}>{children}</Filter>
    </div>
  )
}
