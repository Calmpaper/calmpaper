import Head from 'next/head'
import * as templates from 'components/templates'
import { getBook, getBooks } from 'api'

const Book = ({ book }) => {
  if (!book) return <div />
  const meta = {
    title: `${book.name} by ${book.author.username || book.author.fullname}`,
    description: book.description,
    image: book.image,
    url: `https://calmpaper.com/books/${book.id}`,
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
      <templates.book book={book} />
    </>
  )
}

export const getStaticPaths = async () => {
  const books = await getBooks()

  return {
    paths: books.map(({ id }) => ({
      params: { book: `${id}` },
    })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { book: bookSlug } = context.params
  const book = await getBook(bookSlug)

  return {
    props: {
      book,
    },
  }
}

export default Book
