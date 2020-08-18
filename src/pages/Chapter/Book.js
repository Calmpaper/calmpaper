import React from 'react'
import { Link } from 'react-router-dom'

export default ({ book }) => (
  <>
    <img src={book.image || '/img/placeholder.jpg'} alt={book.name} />
    <h1 className="title size01">{book.name}</h1>
    <Link to={`/users/${book.author.id}`}>
      <div className="author">
        {book.author.username || book.author.fullname}
      </div>
    </Link>
  </>
)
