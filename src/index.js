import React from 'react'
import ReactDOM from 'react-dom'
import { createClient, Provider as URQLProvider } from 'urql'
import {
  BrowserRouter as RouterProvider,
  Switch,
  Route,
} from 'react-router-dom'

import UserProvider from 'context/UserContext'
import ModalProvider from 'context/ModalContext'

import BooksList from 'pages/BooksList/BooksList'
import Book from 'pages/Book/Book'
import Chapter from 'pages/Chapter/Chapter'
import User from 'pages/User/User'

import NewBook from 'pages/New/Book/NewBook'
import NewChapter from 'pages/New/Chapter/NewChapter'

import Layout from 'components/Layout'

import 'assets/css/reset.css'
import 'assets/css/index.css'

const client = createClient({
  url: process.env.REACT_APP_BACKEND_URL,
})

const Providers = ({ children }) => (
  <URQLProvider value={client}>
    <RouterProvider>
      <UserProvider>
        <ModalProvider>{children}</ModalProvider>
      </UserProvider>
    </RouterProvider>
  </URQLProvider>
)

const Routes = () => (
  <Switch>
    <Route path="/books/:book/glossary">
      <Book tab="glossary" />
    </Route>
    <Route path="/books/:book/reviews">
      <Book tab="reviews" />
    </Route>
    <Route path="/books/:book/new-chapter">
      <NewChapter />
    </Route>
    <Route path="/books/:book/:chapter">
      <Chapter />
    </Route>
    <Route path="/books/:book">
      <Book tab="details" />
    </Route>
    <Route path="/books">
      <BooksList />
    </Route>
    <Route path="/new-book">
      <NewBook />
    </Route>
    <Route path="/users/:username">
      <User />
    </Route>
    <Route path="/">
      <BooksList />
    </Route>
  </Switch>
)

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <Layout>
        <Routes />
      </Layout>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
