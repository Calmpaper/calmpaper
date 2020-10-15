import React, { useContext } from 'react'
import { UserContext } from 'context'
import { Link } from 'react-router-dom'
import { useQuery } from 'urql'
import { getUserQuery, getBookQuery, getChapterQuery } from 'api'
import { getUserSlug } from 'helpers'
import Flex from 'components/Flex'
import * as S from './Notification.styled'

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
    <S.Avatar className="ravatar">
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
  let { activities } = notification
  // activities = activities.map((activity) => activity.user.id !== loggedUser.id)

  const bookId = activities && activities[0].bookId
  const chapterId = activities && activities[0].chapterId
  const followerId = activities && activities[0].followerId

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

  const [
    { data: { user: follower } = {}, fetching: isFollowerFetching, error },
  ] = useQuery({
    query: getUserQuery,
    variables: { id: parseInt(followerId) },

    pause: !followerId,
  })

  if (bookFetching || chapterFetching || isFollowerFetching) return null

  if (follower) {
    return (
      <Link to={`/@user${follower.id}`}>
        <S.Notification
          style={!isSeen ? { background: 'hsl(218 94% 97% / 1)' } : {}}
        >
          <Flex row justifyBetween alignCenter>
            <Flex row alignStart>
              <Flex column style={{ width: '100%', paddingTop: 6 }}>
                <Flex row justifyBetween alignCenter>
                  <S.BookCover src={follower.avatar} alt="avatar" hideText />
                  <S.Body style={{ fontSize: 13 }}>
                    <S.User>{follower.username || follower.fullname}</S.User>
                    {` started following you`}
                  </S.Body>
                </Flex>
              </Flex>
            </Flex>

            {/*
          <div
            className="ravatars"
            style={{
              marginRight: '6px',
            }}
          >
            <S.Avatar className="ravatar">
              <img src={follower.avatar} alt={`${follower.avatar}-pic`} />
            </S.Avatar>
          </div>
*/}
          </Flex>
        </S.Notification>
      </Link>
    )
  }

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
  let link = `/${getUserSlug(book.author)}/${book.slug}`

  if (notification.verb === 'add') {
    if (activities[0].object.startsWith('book')) {
      link = `/${getUserSlug(book.author)}/${book.slug}`
      action = ` started a new book`
    }
    if (activities[0].object.startsWith('chapter')) {
      link = `/${getUserSlug(book.author)}/${book.slug}/${chapterPage}`
      action = ` added a new chapter`
    }
  }
  if (notification.verb === 'like') {
    if (activities[0].object.startsWith('comment')) {
      link = chapterPage
        ? `/${getUserSlug(book.author)}/${book.slug}/${chapterPage}`
        : `/${getUserSlug(book.author)}/${book.slug}`
      action = ` liked your comment`
    }
    if (activities[0].object.startsWith('chapter')) {
      link = `/${getUserSlug(book.author)}/${book.slug}/${chapterPage}`
      action = ` liked your chapter`
    }
    if (activities[0].object.startsWith('book')) {
      link = `/${getUserSlug(book.author)}/${book.slug}`
      action = ` liked your book`
    }
  }
  if (notification.verb === 'reply') {
    link = chapterPage
      ? `/${getUserSlug(book.author)}/${book.slug}/${chapterPage}`
      : `/${getUserSlug(book.author)}/${book.slug}`
    action = ` replied to your comment`
  }

  if (notification.verb === 'comment') {
    if (activities[0].object.startsWith('book')) {
      link = `/${getUserSlug(book.author)}/${book.slug}`
      action = ` commented on your book`
    }
    if (activities[0].object.startsWith('chapter')) {
      link = `/${getUserSlug(book.author)}/${book.slug}/${chapterPage}`
      action = ` commented on your chapter`
    }
  }

  if (notification.verb === 'review') {
    link = `/${getUserSlug(book.author)}/${book.slug}/reviews`
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
            <S.BookCover src={cover} alt="book_cover" hideText />
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
            className="ravatars"
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
