import Link from 'next/link'

export const books_catalog = ({ books = [] }) => {
  if (books.length === 0) return null
  return (
    <div className="sidebar-box sidebar-catalog">
      <h4 className="title size04">More by author</h4>
      {books.map((book) => {
        let sum = 0
        for (let i = 0; i < book.reviews.length; i++) {
          sum += parseInt(book.reviews[i].stars, 10) //don't forget to add the base
        }

        var avg = sum / book.reviews.length || 0

        return (
          <Link href={`/books/[book]`} as={`/books/${book.id}`}>
            <a>
              <div
                className="catalog-img"
                style={{
                  backgroundImage: `url('${book.image}')`,
                }}
              />
              <div className="catalog-info">
                <h3 className="catalog-title">{book.name}</h3>
                <p className="catalog-author">{book.author.username}</p>
                <div className="progress">
                  <div className="progress__line">
                    <span
                      className="progress__stat"
                      style={{ width: `${avg * 10}%` }}
                    />
                  </div>
                  <div className="progress__num">{`${avg * 10}%`}</div>
                </div>
                <div className="catalog-stat">
                  <div className="catalog-stat__box">
                    <svg className="icon icon-rating">
                      <use xlinkHref="#icon-rating" />
                    </svg>
                    <span>{book.reviews.length}</span>
                  </div>
                  <div className="catalog-stat__box">
                    <svg className="icon icon-eye">
                      <use xlinkHref="#icon-eye" />
                    </svg>
                    <span>{book.views}</span>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        )
      })}
    </div>
  )
}
