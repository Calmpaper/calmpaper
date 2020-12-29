import React, { useEffect } from 'react'
import {
  Container,
  Logo,
  LogoColored,
  Infinity,
  Content,
  Column,
} from './Home.styled'

import Loader from 'components/atoms/loader'

import BooksFeed from 'components/organisms/feeds/books_feed/all_books'
import ChaptersFeed from 'components/organisms/feeds/chapters_feed/all_chapters'

export default () => {
  useEffect(() => {
    if (window.analytics) {
      window.analytics.page('home')
    }
  }, [])

  return (
    <Container column alignCenter>
      <Logo>
        txt
        <LogoColored>
          b<Infinity>8</Infinity>
        </LogoColored>
        .com
      </Logo>
      <Content>
        <Column>
          New chapter
          <ChaptersFeed />
        </Column>
        <Column>
          Books
          <BooksFeed />
        </Column>
        <Column>Authors</Column>
      </Content>
    </Container>
  )
}
