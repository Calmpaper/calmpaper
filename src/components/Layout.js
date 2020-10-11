import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { useQuery } from 'urql'
import { getBookQuery } from 'api'
import { getUserSlug } from 'helpers'
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
    <Link
      to={`/${getUserSlug(book.author)}/${book.slug}/${
        parseInt(chapterPage) + 1
      }`}
    >
      <Btn right>Next Episode</Btn>
    </Link>
  )
}

export default ({ children }) => {
  const episodeMatch = useRouteMatch('/books/:book/:chapter')

  const showNextEpisode =
    episodeMatch &&
    episodeMatch.isExact &&
    episodeMatch.params.chapter !== 'episodes' &&
    episodeMatch.params.chapter !== 'chapters'

  return (
    <div>
      {showNextEpisode && (
        <NextEpisode
          bookId={episodeMatch.params.book}
          chapterPage={episodeMatch.params.chapter}
        />
      )}
    </div>
  )
}
