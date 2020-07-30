import Link from 'next/link'
import moment from 'moment'

export const table_of_content = ({ chapters, bookId }) => (
  <div className="row row04">
    <h4 className="title size04">
      Table of contents <span className="count">{chapters.length}</span>
    </h4>
    <div className="table">
      <ul>
        {chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <Link
              href={`/books/[book]/[chapter]`}
              as={`/books/${bookId}/${index + 1}`}
            >
              <a>
                <span className="table-title">{`${chapter.title}`}</span>
                <span className="table-time">
                  {moment(chapter.createdAt).fromNow()}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
