import React, { useState, useEffect, useContext } from 'react'
import { UserContext, GetStreamContext } from 'context'
import { useMutation } from 'urql'
import {
  addBookToFavoritesMutation,
  removeBookFromFavoritesMutation,
} from 'api'

export default ({ book, chapter }) => {
  const { user } = useContext(UserContext)
  const { notificationsFeed } = useContext(GetStreamContext)
  const [wasFollowing, setWasFollowing] = useState(undefined)
  const [isFollowing, setFollowing] = useState(undefined)

  const [, addBookToFavorites] = useMutation(addBookToFavoritesMutation)
  const [, removeBookFromFavorites] = useMutation(
    removeBookFromFavoritesMutation,
  )

  const pagesCount = chapter.book.chapters.length
  const currentPage = book.chapters.findIndex((c) => c.id === chapter.id) + 1
  const isLastPage = currentPage === pagesCount

  useEffect(() => {
    // wasFollowing is an initial value whether user was following a book
    // if he was - don't show a banner at all
    // if he wasn't - don't hide the banner after he has followed
    if (user && wasFollowing === undefined) {
      setWasFollowing(!!book.readers.find((reader) => reader.id === user.id))
    }

    if (user) {
      setFollowing(!!book.readers.find((reader) => reader.id === user.id))
    }
  }, [user, book, setFollowing, isFollowing, wasFollowing])

  const onFollow = () => {
    if (isFollowing) {
      removeBookFromFavorites({ userId: user.id, bookId: book.id })
      notificationsFeed.unfollow('book', book.id)
    } else {
      addBookToFavorites({ userId: user.id, bookId: book.id })
      notificationsFeed.follow('book', book.id)
    }
  }

  if (isFollowing && wasFollowing) {
    return <div />
  }

  return (
    <div
      className="banner"
      style={{ backgroundImage: 'url(/img/banner.jpg)', marginTop: 48 }}
    >
      <div>
        <div className="banner__title">
          {isFollowing ? 'Stay tuned for updates :)' : 'Follow for updates?'}
        </div>
        {!isFollowing && (
          <div className="banner__subtitle">
            {isLastPage ? (
              <>
                You have reached the end. To avoid missing out <br />
                future updates by the author, click follow.
              </>
            ) : (
              'To avoid missing out future updates by the author, click follow.'
            )}
          </div>
        )}
        <button className="btn btn-line banner__btn" onClick={onFollow}>
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  )
}
