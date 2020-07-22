import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from 'pages/Home/Home'
import Book from 'pages/Book/Book'
import Chapter from 'pages/Chapter/Chapter'
import User from 'pages/User/User'
import NewBook from 'pages/NewBook/NewBook'
import NewChapter from 'pages/NewChapter/NewChapter'

const Routes = () => (
  <Switch>
    <Route path="/books/:book/reviews">
      <Book tab="reviews" />
    </Route>
    <Route path="/books/:book/new-chapter">
      <NewChapter />
    </Route>
    <Route path="/books/:book/edit">
      <NewBook />
    </Route>
    <Route path="/books/:book/:chapter/edit">
      <NewChapter />
    </Route>
    <Route path="/books/:book/:chapter">
      <Chapter />
    </Route>
    <Route path="/books/:book">
      <Book tab="details" />
    </Route>
    <Route path="/new-book">
      <NewBook />
    </Route>
    <Route path="/users/:id">
      <User />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
)

export default Routes
