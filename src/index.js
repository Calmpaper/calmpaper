import React from 'react'
import ReactDOM from 'react-dom'
import { createClient, Provider } from 'urql'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import UserProvider from 'context/UserContext'
import PlayerProvider from 'context/PlayerContext'
import ModalProvider from 'context/ModalContext'

import BooksList from 'pages/BooksList/BooksList'
import Book from 'pages/Book/Book'
import Episode from 'pages/Episode/Episode'
import Chapter from 'pages/Episode/Chapter'
import User from 'pages/User/User'

import NewBook from 'pages/New/Book/NewBook'
import NewChapter from 'pages/New/Chapter/NewChapter'

import Layout from 'components/Layout'

import 'assets/css/reset.css'
import 'assets/css/index.css'

const client = createClient({
  // url: 'https://cors-anywhere.herokuapp.com/http://ec2-52-87-215-106.compute-1.amazonaws.com:4000/',
  url: 'http://localhost:4000',
})

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <Router>
        <PlayerProvider>
          <UserProvider>
            <ModalProvider>
              <Layout>
                <Switch>
                  <Route path="/books/:book/:chapter/text">
                    <Chapter />
                  </Route>
                  <Route path="/books/:book/episodes">
                    <Book tab="episodes" />
                  </Route>
                  <Route path="/books/:book/chapters">
                    <Book tab="chapters" />
                  </Route>
                  <Route path="/books/:book/new-chapter">
                    <NewChapter />
                  </Route>
                  <Route path="/books/:book/:chapter">
                    <Episode />
                  </Route>
                  <Route path="/books/:book">
                    <Book tab="episodes" />
                  </Route>
                  <Route path="/books">
                    <BooksList />
                  </Route>
                  <Route path="/new-story">
                    <NewBook />
                  </Route>
                  <Route path="/users/:username">
                    <User />
                  </Route>
                  <Route path="/">
                    <BooksList />
                  </Route>
                </Switch>
              </Layout>
            </ModalProvider>
          </UserProvider>
        </PlayerProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
