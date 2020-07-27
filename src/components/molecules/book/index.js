import Link from 'next/link'
// import Rating from 'components/Rating'

// <cover />
// <name />
// <author />
// <rating />

export const book = ({ book = {} }) => {
  return (
    <div className="col">
      <Link href={`/books/[book]`} as={`/books/${book.id}`}>
        <a>
          <div>
            <div
              className="catalog-img"
              style={{ backgroundImage: `url('${book.image}')` }}
            />
            <h3 className="catalog-title">{book.name}</h3>
            {book.author && (
              <p className="catalog-author">
                {book.author.username || book.author.fullname}
              </p>
            )}
            {/* book.reviews.length > 0 && (
          <Rating ratings={book.reviews} readOnly quiet />
            )*/}
          </div>
        </a>
      </Link>
    </div>
  )
}
