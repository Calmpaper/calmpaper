import React from 'react'
import { Helmet } from 'react-helmet'

export default ({ chapter, chapterPage }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>
      {`${chapter.title}. ${chapter.book.name} by ${
        chapter.author.username || chapter.author.fullname
      } at Calmpaper`}{' '}
    </title>

    <meta
      property="og:title"
      content={`${chapter.title}. ${chapter.book.name} by ${
        chapter.author.username || chapter.author.fullname
      } at Calmpaper`}
    />
    <meta property="og:description" content={chapter.content} />
    <meta property="og:image" content={chapter.book.image} />
    <meta
      property="og:url"
      content={`https://calmpaper.org/books/${chapter.book.id}/${chapterPage}`}
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:site_name" content="Calmpaper" />
    <meta name="twitter:image:alt" content={`${chapter.book.name} cover`} />
    <meta name="twitter:site" content="@Calmpaper" />
  </Helmet>
)
