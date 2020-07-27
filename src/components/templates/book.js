import * as molecules from 'components/molecules'
import * as organisms from 'components/organisms'

console.log('organisms')
console.log(organisms)
export const book = ({ book }) => (
  <div className="page-about-book">
    <div className="two-col">
      <div className="col-content">
        <div className="items">
          {/*
          <organisms.book book={book} />
          */}
          <organisms.comments comments={book.comments} />
          <molecules.footer />
        </div>
      </div>
      <molecules.author author={book.author} />
      <molecules.books_catalog books={book.author.books} /> />
    </div>
  </div>
)

// const book_organism = () => (

// )
