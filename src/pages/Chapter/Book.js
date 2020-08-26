import React from 'react'
import { Link } from 'react-router-dom'

export default ({ book }) => (
  <>
    <img src={book.image || '/img/placeholder.jpg'} alt={book.name} />
    <h1
      className="title size01"
      style={{
        maxWidth: '630px',
        margin: '50px auto 20px',
      }}
    >
      {book.name}
    </h1>
    <Link
      to={`/users/${
        book.author.username ? `@${book.author.username}` : book.author.id
      }`}
    >
      <div className="author">
        {book.author.username || book.author.fullname}
      </div>
    </Link>
  </>
)
