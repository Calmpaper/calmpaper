import React from 'react'
import { removeHtmlTags } from 'helpers'
import { Helmet } from 'react-helmet'

export default ({ chapter, chapterPage }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>
      {`${chapter.title}. ${chapter.book.name} by ${
        chapter.author.username || chapter.author.fullname
      }`}
    </title>

    <meta
      property="og:title"
      content={`${chapter.title}. ${chapter.book.name} by ${
        chapter.author.username || chapter.author.fullname
      }`}
    />
    <meta property="og:description" content={removeHtmlTags(chapter.content)} />
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
