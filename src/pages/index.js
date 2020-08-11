import * as templates from 'components/templates'
import { getHome } from 'api'

const Home = ({ home }) => (
  <templates.home books={home.books} chapters={home.chapters} />
)

export const getStaticProps = async () => {
  console.log('init')
  const home = await getHome()
  console.log('home')
  console.log(home)

  return {
    props: {
      home,
    },
  }
}

export default Home
