import React from 'react'

export default ({ genres = [] }) =>
  genres.length > 0 && (
    <div className="row row02">
      <h4 className="title size04">Genre</h4>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <a href>{genre.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
