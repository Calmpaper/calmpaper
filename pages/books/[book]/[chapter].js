import Head from 'next/head'
import * as templates from 'components/templates'
import { getChapter, getChapters } from 'api'

const Chapter = ({ chapter }) => {
  console.log('chapter')
  console.log(chapter)
  return <div />
  const meta = {
    title: `${chapter.title} - ${chapter.book.name}. Calmpaper`,
    description: chapter.content,
    image: chapter.book.image,
    url: `https://calmpaper.com/books/${chapter.book.id}/${chapter.id}`,
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={meta.url} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:creator" content="@Calmpaper" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:site_name" content="Calmpaper" />
        <meta property="og:url" content={meta.url} />
        <meta property="og:image" content={meta.image} />
      </Head>
      <templates.chapter chapter={chapter} />
    </>
  )
}

export const getStaticProps = async () => {
  // const chapter = await getChapter()
  // console.log('chapter')
  // console.log(chapter)

  return {
    props: {
      chapter: {},
    },
  }
}

export const getStaticPaths = async () => {
  const chapters = await getChapters()
  console.log('chapters')
  console.log(chapters)

  return {
    paths: chapters
      .filter((c) => !!c.book)
      .map((chapter) => ({
        params: {
          chapter: `${chapter.id}`,
          book: `${chapter.book.id}`,
        },
      })),
    fallback: true,
  }
}

export default Chapter
