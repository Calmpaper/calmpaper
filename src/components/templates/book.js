import * as molecules from 'components/molecules'
import * as organisms from 'components/organisms'

export const book = ({ book }) => (
  <div className="page-about-book">
    <div className="two-col">
      <div className="col-content">
        <div className="items">
          <organisms.book book={book} />
          <molecules.actions book={book} />
          <div style={{ marginTop: 48 }}>
            <organisms.comments comments={book.comments} />
          </div>
          <molecules.footer />
        </div>
      </div>
      <div className="col-sidebar">
        <div className="items">
          <molecules.author author={book.author} />
          <molecules.books_catalog
            books={book.author.books.filter((b) => b.id !== book.id)}
          />
        </div>
      </div>
    </div>
  </div>
)
