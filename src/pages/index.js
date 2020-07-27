import * as templates from 'components/templates'
import { getHome } from 'api'

const Home = ({ home }) => (
  <templates.home books={home.books} chapters={home.chapters} />
)

export const getStaticProps = async () => {
  const home = await getHome()

  return {
    props: {
      home,
    },
  }
}

export default Home
