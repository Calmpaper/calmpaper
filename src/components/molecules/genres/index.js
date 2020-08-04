import * as atoms from 'components/atoms'

export const genres = ({
  genres = [],
  selectable = false,
  value = [],
  onChange = () => {},
}) => {
  if (selectable) {
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
              <atoms.genre
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

  if (genres.length === 0) return null

  return (
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
}
