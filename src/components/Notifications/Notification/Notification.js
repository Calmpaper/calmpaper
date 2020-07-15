import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Flex from 'components/Flex'
import { useQuery } from 'urql'
import * as S from './Notification.styled'
import { getBookQuery, getChapterQuery } from 'api'

export default ({ notification, closeNotifications: close }) => {
  const { user: loggedUser } = useContext(UserContext)
  console.log(notification)

  // if (notification.object.startsWith('book') && notification.verb === 'start') {
  //   notificationBody = (
  //     <S.Body>
  //       <S.Name>{notification.user.fullname}</S.Name>
  //       {` started a new book `}
  //     </S.Body>
  //   )
  //   notificationLink = `/books/${notification.book.id}`
  // }

  // if (notification.object.startsWith('chapter')) {
  //   // book notifications
  // }

  // if (
  //   notification.object.startsWith('comment') &&
  //   notification.verb === 'like'
  // ) {
  //   notificationBody = (
  //     <S.Body>
  //       <S.Name>{notification.user.fullname}</S.Name>
  //       {` liked your comment `}
  //     </S.Body>
  //   )
  //   notificationLink = `/books/${notification.book.id}`
  // }

  // if (
  //   notification.object.startsWith('comment') &&
  //   notification.verb === 'reply'
  // ) {
  //   notificationBody = (
  //     <S.Body>
  //       <S.Name>{notification.user.fullname}</S.Name>
  //       {` replied to your comment `}
  //     </S.Body>
  //   )
  //   notificationLink = `/books/${notification.book.id}`
  // }

  // if (
  //   notification.object.startsWith('chapter') &&
  //   notification.verb === 'comment'
  // ) {
  //   notificationBody = (
  //     <S.Body>
  //       <S.Name>{notification.user.fullname}</S.Name>
  //       {` commented on your chapter`}
  //     </S.Body>
  //   )
  //   notificationLink = `/books/${notification.chapter.book.id}/${notification.chapter.id}`
  // }

  // if (
  //   notification.object.startsWith('book') &&
  //   notification.verb === 'comment'
  // ) {
  //   notificationBody = (
  //     <S.Body>
  //       <S.Name>{notification.user.fullname}</S.Name>
  //       {` commented on your book `}
  //     </S.Body>
  //   )
  //   notificationLink = `/books/${notification.book.id}`
  // }

  // if (
  //   notification.object.startsWith('book') &&
  //   notification.verb === 'review'
  // ) {
  //   notificationBody = (
  //     <S.Body>
  //       <S.Name>{notification.user.fullname}</S.Name>
  //       {` reviewed your book `}
  //     </S.Body>
  //   )
  //   notificationLink = `/books/${notification.book.id}/reviews`
  // }

  let { activities } = notification
  // activities = activities.map((activity) => activity.user.id !== loggedUser.id)

  const bookId = activities[0].bookId
  const chapterId = activities[0].chapterId

  const [{ data: { book } = {}, fetching: bookFetching, error }] = useQuery({
    pause: !bookId,
    query: getBookQuery,
    variables: {
      id: parseInt(bookId),
    },
  })

  const [{ data: { chapter = {} } = {}, fetching: chapterFetching }] = useQuery(
    {
      pause: !chapterId,
      query: getChapterQuery,
      variables: {
        id: parseInt(chapterId),
      },
    },
  )

  if (bookFetching || chapterFetching) return <div>loading...</div>

  const cover = book.image
  const title = book.name
  const subtitle = chapter ? chapter.title : null

  let body = ''

  /* ---------------------------------------------------- */
  let users
  if (notification.activity_count === 1) {
    users = <S.User>{activities[0].user.givenname}</S.User>
  }
  if (notification.activity_count === 2) {
    users = (
      <>
        <S.User>{activities[0].user.givenname}</S.User>
        {` and `}
        <S.User>{activities[1].user.givenname}</S.User>
      </>
    )
  }
  if (notification.activity_count === 3) {
    users = (
      <>
        <S.User>{activities[0].user.givenname}</S.User>
        {`, `}
        <S.User>{activities[1].user.givenname}</S.User>
        {` and `}
        <S.User>{activities[2].user.givenname}</S.User>
      </>
    )
  }
  if (notification.activity_count > 3) {
    users = (
      <>
        <S.User>{activities[0].user.givenname}</S.User>
        {`, `}
        <S.User>{activities[1].user.givenname}</S.User>
        {`, `}
        <S.User>{activities[2].user.givenname}</S.User>
        {` and ${activities.length - 3} others`}
      </>
    )
  }
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  let action = ` started following your book`
  let link = `/books/${bookId}`
  if (notification.verb === 'add') {
    link = `/books/${bookId}/${chapterId}`
    action = ` added a new chapter`
  }
  if (notification.verb === 'like') {
    if (activities[0].object.startsWith('comment')) {
      link = chapterId ? `/books/${bookId}/${chapterId}` : `/books/${bookId}`
      action = ` liked your comment`
    }
    if (activities[0].object.startsWith('chapter')) {
      link = `/books/${bookId}/${chapterId}`
      action = ` liked your chapter`
    }
    if (activities[0].object.startsWith('book')) {
      link = `/books/${bookId}`
      action = ` liked your book`
    }
  }
  if (notification.verb === 'reply') {
    link = chapterId ? `/books/${bookId}/${chapterId}` : `/books/${bookId}`
    action = ` replied to your comment`
  }

  if (notification.verb === 'comment') {
    if (activities[0].object.startsWith('book')) {
      link = `/books/${bookId}`
      action = ` commented on your book`
    }
    if (activities[0].object.startsWith('chapter')) {
      link = `/books/${bookId}/${chapterId}`
      action = ` commented on your chapter`
    }
  }
  /* ---------------------------------------------------- */

  body = (
    <Flex row justifyBetween alignCenter>
      <S.Body>
        {users}
        {action}
      </S.Body>

      <div
        className="avatars"
        style={{
          marginRight: '6px',
        }}
      >
        {activities.map(
          (activity, index) =>
            index < 5 && (
              <S.Avatar className="avatar">
                <img
                  src={activity.user.avatar}
                  alt={`${activity.user.avatar}-pic`}
                />
              </S.Avatar>
            ),
        )}
      </div>
    </Flex>
  )

  return (
    <Link to={link} onClick={close}>
      <S.Notification>
        <Flex row alignStart>
          <S.BookCover src={cover} alt="book_cover" />
          <Flex column style={{ width: '100%', paddingTop: 6 }}>
            <h4
              className="comment-title"
              style={{ fontSize: 17, marginBottom: 6, marginTop: 0 }}
            >
              {title}{' '}
              {subtitle && (
                <span
                  style={{
                    color: '#000000',
                    fontWeight: 500,
                    opacity: 0.6,
                    fontSize: '17px',
                  }}
                >
                  · {subtitle}
                </span>
              )}
            </h4>
            {body}
          </Flex>
        </Flex>
      </S.Notification>
    </Link>
  )
}
// <span>· {moment(notification.time).fromNow()}</span>
