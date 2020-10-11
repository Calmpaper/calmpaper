import React, { useContext } from 'react'
import { UserContext } from 'context'
import { useRouteMatch, Link } from 'react-router-dom'
import { useQuery } from 'urql'
import { getBookQuery } from 'api'
import { getUserSlug } from 'helpers'

// export default () => null

const AddChapter = ({ book }) => {
  return (
    <li className="header-nav__item">
      <Link
        to={`/${getUserSlug(book.author)}/${book.slug}/new-chapter`}
        className="header-nav__link"
      >
        Add page
      </Link>
    </li>
  )
}

export default () => {
  const bookMatch = useRouteMatch('/books/:book')
  const bookId = bookMatch && bookMatch.params.book
  const { user } = useContext(UserContext)

  const [{ data: { book } = {} }] = useQuery({
    pause: !bookId,
    query: getBookQuery,
    variables: {
      id: parseInt(bookId),
    },
  })

  if (!bookId || (book && book.author.id !== user.id)) return null
  return <AddChapter book={book} />
}
