import React from 'react'

const Genre = ({ genre, isSelected, onSelect }) => {
  return (
    <li key={genre.id}>
      <button
        className={isSelected ? 'green' : 'light'}
        onClick={(e) => {
          e.preventDefault()
          onSelect(genre, isSelected)
        }}
      >
        {genre.label}
      </button>
    </li>
  )
}

export default ({ genres = [], value = [], onChange }) => {
  const onSelect = (genre, isSelected) => {
    if (isSelected) {
      onChange(value.filter((g) => g.id !== genre.id))
    } else {
      onChange([...value, genre])
    }
  }

  return (
    <div className="block block04 add-series-genre">
      <h3 className="title size04">Genre</h3>
      <ul className="tags">
        {genres.map((genre) => {
          const isSelected = value.findIndex((g) => g.id === genre.id) > -1

          return (
            <Genre
              isSelected={isSelected}
              onSelect={onSelect}
              genre={genre}
              key={genre.id}
            />
          )
        })}
      </ul>
    </div>
  )
}
