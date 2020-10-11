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

const Routes = () => (
  <Switch>
    {/* Auth */}
    <Route path="/signup">
      <SignUp />
    </Route>
    <Route path="/login">
      <Login />
    </Route>

    {/* Misc */}
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
    <Route path="/new-book">
      <NewBook />
    </Route>
    <Route path="/" exact>
      <Home />
    </Route>

    {/* Books */}
    <Route
      path={[
        '/@user:id/:book/reviews',
        '/@:username/:book/reviews',
        '/books/:id/reviews',
      ]}
    >
      <Book tab="reviews" />
    </Route>
    <Route
      path={[
        '/@user:id/:book/new-chapter',
        '/@:username/:book/new-chapter',
        '/books/:id/new-chapter',
      ]}
    >
      <NewChapter />
    </Route>
    <Route
      path={[
        '/@user:id/:book/edit',
        '/@:username/:book/edit',
        '/books/:id/edit',
      ]}
    >
      <NewBook />
    </Route>
    <Route
      path={[
        '/@user:id/:book/:chapter/edit',
        '/@:username/:book/:chapter/edit',
        '/books/:chapter:/edit',
      ]}
    >
      <NewChapter />
    </Route>
    <Route
      path={[
        '/@user:id/:book/:chapter',
        '/@:username/:book/:chapter',
        '/books/:id/:chapter',
      ]}
    >
      <Chapter />
    </Route>
    <Route path={['/@user:id/:book', '/@:username/:book', '/books/:id']}>
      <Book tab="details" />
    </Route>
    {/* Users */}
    <Route
      path={[
        '/users/@user@:id',
        '/users/@:username',
        '/@user:id',
        '/@:username',
      ]}
    >
      <User />
    </Route>
  </Switch>
)

export default Routes
