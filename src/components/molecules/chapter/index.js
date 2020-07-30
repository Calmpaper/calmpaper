import Link from 'next/link'
import moment from 'moment'

export const chapter = ({ chapter, chapterPage }) => {
  if (!chapter) return null
  return (
    <Link
      href={`/books/[book]/[chapter]`}
      as={`/books/${chapter.book.id}/${chapterPage}`}
    >
      <div className="item">
        <div className="col">
          <div
            className="item-img"
            style={{
              backgroundImage: `url('${chapter.book.image}')`,
            }}
          />
          <div className="item-info">
            <h3 className="item-title">
              {`${chapter.book.name} · ${chapter.title}`}
            </h3>
            {chapter.book.genres.length > 0 && (
              <ul className="item-category">
                {chapter.book.genres.map((genre) => (
                  <li key={genre.id} style={{ marginRight: 8 }}>
                    <a style={{ fontWeight: 400 }} href="/">
                      {genre.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col">
          <div className="item-time">{`${
            chapter.author.username || chapter.author.fullname
          }, ${moment(chapter.createdAt).fromNow()}`}</div>
        </div>
      </div>
    </Link>
  )
}
