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
import Welcome from 'pages/Welcome/Welcome'
import Invite from 'pages/Invite/Invite'
import Landing from 'pages/Landing'
import Editor from 'components/Editor'
import Feed from 'pages/Feed'
import FollowedBooksPage from 'pages/FollowedBooksPage'
import AdminCommentsFeed from 'pages/Admin/Feed/Comments'
import AdminLikesFeed from 'pages/Admin/Feed/Likes'

const Routes = () => (
  <Switch>
    <Route path="/about">
      <Landing />
    </Route>
    {/* Auth */}
    <Route path="/signup">
      <SignUp />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/feed">
      <Feed />
    </Route>

    <Route path="/last-comments" exact>
      <AdminCommentsFeed />
    </Route>
    <Route path="/admin/feed/likes" exact>
      <AdminLikesFeed />
    </Route>

    {/* Misc */}
    <Route path="/dashboard">
      <Dashboard />
    </Route>
    <Route path="/help">
      <Help />
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
    <Route path="/books" exact>
      <FollowedBooksPage />
    </Route>
    <Route
      path={[
        '/@user:userId/:bookSlug/reviews',
        '/@:username/:bookSlug/reviews',
        '/books/:bookId/reviews',
      ]}
    >
      <Book tab="reviews" />
    </Route>
    <Route
      path={[
        '/@user:userId/:bookSlug/new-chapter',
        '/@:username/:bookSlug/new-chapter',
        '/books/:bookId/new-chapter',
      ]}
    >
      <NewChapter />
    </Route>
    <Route
      path={[
        '/@user:userId/:bookSlug/edit',
        '/@:username/:bookSlug/edit',
        '/books/:bookId/edit',
      ]}
    >
      <NewBook />
    </Route>
    <Route
      path={[
        '/@user:userId/:bookSlug/:chapter/edit',
        '/@:username/:bookSlug/:chapter/edit',
        '/books/:bookId/:chapter:/edit',
      ]}
    >
      <NewChapter />
    </Route>
    <Route
      path={[
        '/@user:userId/:bookSlug/:chapter',
        '/@:username/:bookSlug/:chapter',
        '/books/:bookId/:chapter',
      ]}
    >
      <Chapter />
    </Route>
    <Route
      path={[
        '/@user:userId/:bookSlug',
        '/@:username/:bookSlug',
        '/books/:bookId',
      ]}
    >
      <Book tab="details" />
    </Route>

    {/* Users */}
    <Route
      path={[
        '/users/@user@:userId',
        '/users/@:username',
        '/@user:userId',
        '/@:username',
      ]}
    >
      <User />
    </Route>
  </Switch>
)

export default Routes
