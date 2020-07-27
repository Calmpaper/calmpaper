import * as molecules from 'components/molecules'
import * as organisms from 'components/organisms'

export const home = ({ books, chapters }) => (
  <div className="page-home">
    <molecules.header />
    <molecules.hero />
    <organisms.books_feed books={books} title="Trending" sort="trending" />
    <organisms.books_feed books={books} title="Latest series" sort="newest" />
    <organisms.chapters_feed
      chapters={chapters}
      title="Latest updates"
      sort="newest"
    />
    <molecules.footer />
  </div>
)
