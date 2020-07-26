/* eslint-disable react/react-in-jsx-scope */
const hero = () => <div>hero</div>
const search = () => <div>search</div>
const books_feed = () => <div>books_feed</div>
const chapters_feed = () => <div>chapters_feed</div>

const organisms = {
  hero,
  search,
  books_feed,
  chapters_feed,
}

export default () => (
  <div>
    <organisms.hero />
    <organisms.search />
    <organisms.books_feed title="Trending" sort="trending" />
    <organisms.books_feed title="Latest series" sort="newest" />
    <organisms.chapters_feed title="Latest updates" sort="newest" />
  </div>
)
