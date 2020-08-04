import * as molecules from 'components/molecules'
import * as components from './components'

export const chapter = ({ chapter }) => (
  <>
    <div className="read-book-main">
      <components.book book={chapter.book} />
      <components.ratings chapter={chapter} />
    </div>
    <components.content chapter={chapter} />
    <components.author author={chapter.author} />
    <components.actions chapter={chapter} />
    <components.chapter_navigation chapter={chapter} />
  </>
)
