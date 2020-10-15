import React from 'react'
import { Helmet } from 'react-helmet'
import { removeHtmlTags } from 'helpers'

export default ({ book }) => {
  const meta = {
    title: `${book.name} by ${
      book.author && (book.author.username || book.author.fullname)
    }`,
    description: removeHtmlTags(book.description),
    image: book.image,
    url: `https://calmpaper.org/books/${book.id}`,
  }
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{meta.title}</title>

      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:url" content={meta.url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site_name" content="Calmpaper" />
      <meta name="twitter:image:alt" content={`${book.name} cover`} />
      <meta name="twitter:site" content="@Calmpaper" />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={meta.title} />
      <meta itemProp="description" content={meta.description} />
      <meta itemProp="image" content={meta.image} />
      {/* Facebook Meta Tags */}
      <meta property="og:url" content={meta.url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Helmet>
  )
}
