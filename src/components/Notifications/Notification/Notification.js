import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Flex from 'components/Flex'
import { useQuery } from 'urql'
import * as S from './Notification.styled'
import { getUserQuery, getBookQuery, getChapterQuery } from 'api'

const UserAvatar = ({ userId }) => {
  const [{ data: { user } = {}, fetching }] = useQuery({
    pause: !userId,
    query: getUserQuery,
    variables: {
      id: parseInt(userId),
    },
  })
  if (fetching || !user) return null
  return (
    <S.Avatar className="avatar">
      <img src={user.avatar} alt={`${user.avatar}-pic`} />
    </S.Avatar>
  )
}

const User = ({ userId }) => {
  const [{ data: { user } = {}, fetching }] = useQuery({
    pause: !userId,
    query: getUserQuery,
    variables: {
      id: parseInt(userId),
    },
  })
  if (fetching || !user) return null
  return <S.User>{user.username || user.givenname}</S.User>
}

export default ({ notification, closeNotifications: close }) => {
  const { user: loggedUser } = useContext(UserContext)

  const isSeen = notification.is_seen

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

  const [{ data: { book } = {}, fetching: bookFetching }] = useQuery({
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

  if (bookFetching || chapterFetching) return null

  if (!book) return null

  const chapterPage =
    chapterId &&
    book.chapters.findIndex((c) => c.id === parseInt(chapterId)) + 1

  const cover = book && (book.image || '/img/placeholder.jpg')
  const title = book && book.name
  const subtitle = chapter ? chapter.title : null

  let body = ''

  /* ---------------------------------------------------- */
  let users
  if (notification.activity_count === 1) {
    users = <User userId={activities[0].userId} />
  }
  if (notification.activity_count === 2) {
    users = (
      <>
        <User userId={activities[0].userId} />
        {` and `}
        <User userId={activities[1].userId} />
      </>
    )
  }
  if (notification.activity_count === 3) {
    users = (
      <>
        <User userId={activities[0].userId} />
        {`, `}
        <User userId={activities[1].userId} />
        {` and `}
        <User userId={activities[2].userId} />
      </>
    )
  }
  if (notification.activity_count > 3) {
    users = (
      <>
        <User userId={activities[0].userId} />
        {`, `}
        <User userId={activities[1].userId} />
        {`, `}
        <User userId={activities[2].userId} />
        {` and ${activities.length - 3} others`}
      </>
    )
  }
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  let action = ` started following your book`
  let link = `/books/${bookId}`

  if (notification.verb === 'add') {
    if (activities[0].object.startsWith('book')) {
      link = `/books/${bookId}`
      action = ` started a new book`
    }
    if (activities[0].object.startsWith('chapter')) {
      link = `/books/${bookId}/${chapterPage}`
      action = ` added a new chapter`
    }
  }
  if (notification.verb === 'like') {
    if (activities[0].object.startsWith('comment')) {
      link = chapterPage
        ? `/books/${bookId}/${chapterPage}`
        : `/books/${bookId}`
      action = ` liked your comment`
    }
    if (activities[0].object.startsWith('chapter')) {
      link = `/books/${bookId}/${chapterPage}`
      action = ` liked your chapter`
    }
    if (activities[0].object.startsWith('book')) {
      link = `/books/${bookId}`
      action = ` liked your book`
    }
  }
  if (notification.verb === 'reply') {
    link = chapterPage ? `/books/${bookId}/${chapterPage}` : `/books/${bookId}`
    action = ` replied to your comment`
  }

  if (notification.verb === 'comment') {
    if (activities[0].object.startsWith('book')) {
      link = `/books/${bookId}`
      action = ` commented on your book`
    }
    if (activities[0].object.startsWith('chapter')) {
      link = `/books/${bookId}/${chapterPage}`
      action = ` commented on your chapter`
    }
  }

  if (notification.verb === 'review') {
    link = `/books/${bookId}/reviews`
    action = ` left a review on your book`
  }
  /* ---------------------------------------------------- */

  body = (
    <Flex row justifyBetween alignCenter>
      <S.Body style={{ fontSize: 13 }}>
        {users}
        {action}
      </S.Body>
    </Flex>
  )

  return (
    <Link to={link} onClick={close}>
      <S.Notification
        style={!isSeen ? { background: 'hsl(218 94% 97% / 1)' } : {}}
      >
        <Flex row justifyBetween alignCenter>
          <Flex row alignStart>
            <S.BookCover src={cover} alt="book_cover" />
            <Flex column style={{ width: '100%', paddingTop: 6 }}>
              <h4
                className="comment-title"
                style={{
                  fontSize: 16,
                  marginBottom: 8,
                  marginTop: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {title}
                {subtitle && (
                  <span
                    style={{
                      color: '#000000',
                      fontWeight: 500,
                      opacity: 0.6,
                      fontSize: '15px',
                      marginTop: 6,
                    }}
                  >
                    {subtitle}
                  </span>
                )}
              </h4>
              {body}
            </Flex>
          </Flex>

          <div
            className="avatars"
            style={{
              marginRight: '6px',
            }}
          >
            {activities.map(
              (activity, index) =>
                index < 5 && <UserAvatar userId={activity.userId} />,
            )}
          </div>
        </Flex>
      </S.Notification>
    </Link>
  )
}
// <span>· {moment(notification.time).fromNow()}</span>
