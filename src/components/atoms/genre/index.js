export const genre = ({ genre, isSelected, onSelect }) => {
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
