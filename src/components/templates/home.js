import * as molecules from 'components/molecules'
import * as organisms from 'components/organisms'

export const home = ({ books, chapters }) => (
  <div className="page-home">
    <molecules.header home />
    <div style={{ marginBottom: 200 }} />
    {/*
    <molecules.hero />
    <organisms.books_feed books={books} title="Trending" sort="trending" />
    */}
    <organisms.chapters_feed
      chapters={chapters}
      title="Latest updates"
      sort="newest"
    />

    <organisms.books_feed books={books} title="Latest series" sort="newest" />
    <molecules.footer />
  </div>
)
