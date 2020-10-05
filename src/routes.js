import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from 'pages/Home/Home'
import Book from 'pages/Book/Book'
import Chapter from 'pages/Chapter/Chapter'
import User from 'pages/User/User'
import NewBook from 'pages/NewBook/NewBook'
import NewChapter from 'pages/NewChapter/NewChapter'
import SignUp from 'pages/Auth/SignUp'
import Login from 'pages/Auth/Login'
import AuthFail from 'pages/Auth/Fail'
import Dashboard from 'pages/Dashboard'
import Help from 'pages/Help/Help'
import Explore from 'pages/Explore/Explore'
import Welcome from 'pages/Welcome/Welcome'
import Invite from 'pages/Invite/Invite'
import Editor from 'components/Editor'
import CommentsFeed from 'pages/Home/CommentsFeed'
import AllBooks from 'pages/AllBooks'
import AllChapters from 'pages/AllChapters'

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
    <Route path="/users/@user:id">
      <User />
    </Route>
    <Route path="/users/@:username">
      <User />
    </Route>
    <Route path="/@:username">
      <User />
    </Route>
    <Route path="/signup">
      <SignUp />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/dashboard">
      <Dashboard />
    </Route>
    <Route path="/help">
      <Help />
    </Route>
    <Route path="/explore">
      <Explore />
    </Route>
    <Route path="/welcome">
      <Welcome />
    </Route>
    <Route path="/invite">
      <Invite />
    </Route>
    <Route path="/editor">
      <Editor />
    </Route>
    <Route path="/comments">
      <CommentsFeed />
    </Route>
    <Route path="/auth-fail">
      <AuthFail />
    </Route>
    <Route path="/all-books">
      <AllBooks />
    </Route>
    <Route path="/all-chapters">
      <AllChapters />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
)

export default Routes
