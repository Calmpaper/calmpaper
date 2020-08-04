export const genres = ({ genres = [], value = [], onChange }) => {
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
