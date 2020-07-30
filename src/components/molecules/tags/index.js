export const tags = ({ tags = [] }) =>
  tags.length > 0 ? (
    <div className="row row03">
      <h4 className="title size04">Tags</h4>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <a href="/">{tag.label}</a>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div />
  )
