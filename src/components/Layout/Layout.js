import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// import Header from './Header'
// import Footer from './Footer'
import Icons from 'assets/icons'

export default ({ children }) => {
  const { pathname } = useLocation()
  // const homeMatch = useRouteMatch('/')
  // const bookMatch = useRouteMatch('/books/:book')
  // const glossaryMatch = useRouteMatch('/books/:book/glossary')
  // const reviewMatch = useRouteMatch('/books/:book/review')
  // const chapterMatch = useRouteMatch('/books/:book/:chapter')

  // const isHome = homeMatch && homeMatch.isExact
  // const isBook =
  //   (bookMatch && bookMatch.isExact) || glossaryMatch || reviewMatch
  // const isChapter =
  //   chapterMatch && chapterMatch.isExact && !glossaryMatch && !reviewMatch

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div>
      <Icons />
      {children}
      {/*
      <Header fullWidth={isHome} withLine={isChapter} />
      */}
      {/*
      <Footer centered={isHome || isChapter} />
      */}
    </div>
  )
}
