import Link from 'next/link'
import * as molecules from 'components/molecules'
import * as components from './about'

const Description = ({ description }) => (
  <div className="row row01">
    <div
      className="text"
      dangerouslySetInnerHTML={{
        __html: description.replace(/(?:\r\n|\r|\n)/g, '<br />'),
      }}
      style={{ lineHeight: '160%' }}
    />
  </div>
)

export const book = ({ book, tab = 'details' }) => (
  <>
    <components.about book={book} />
    <div className="about-book-info">
      <div className="about-book-tabs">
        <Link href={`/books/[book]`} as={`/books/${book.id}`} shallow>
          <a className={tab === 'details' ? 'active' : ''}>Details</a>
        </Link>
        <Link
          href={`/books/[book]/reviews`}
          as={`/books/${book.id}/reviews`}
          shallow
        >
          <a className={tab === 'reviews' ? 'active' : ''}>Reviews</a>
        </Link>
      </div>

      <>
        <Description description={book.description} />
        <molecules.genres genres={book.genres} />
        <molecules.tags tags={book.tags} />
        {book.chapters.length > 0 && (
          <molecules.table_of_content
            chapters={book.chapters}
            bookId={book.id}
          />
        )}
      </>
    </div>
  </>
)
