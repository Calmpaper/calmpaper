import React, { useState, useRef } from 'react'
import { useMutation } from 'urql'
import { useHistory } from 'react-router-dom'
import { deleteChapterMutation, deletePollMutation } from 'api'
import { getUserSlug, getChapterPage } from 'helpers'
import ConfirmationModal from 'components/ConfirmationModal'

import { useOnClickOutside } from 'hooks'

export default ({ bookId, chapterId, chapter, hide, hideEdit }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const { push } = useHistory()  

  const [, deleteChapter] = useMutation(deleteChapterMutation)
  const [, deletePoll] = useMutation(deletePollMutation)
  const onDelete = async () => {
    await deletePoll({ chapterId })
    await deleteChapter({ id: chapterId })
    setShowDeleteConfirmation(false)
    push(`/`)
  }

  const popupRef = useRef()
  
  useOnClickOutside(popupRef, () => hide())

  return (
    <>
      <div
        ref={popupRef}
       className="dropdown-box notification-box notification-header-box">
        <div className="header-notification-user__body">
          <ul className="header-notification-user__list">
            {!hideEdit && (
              <li>
                <a
                  href
                  onClick={() => {
                    push({
                      pathname: `/${getUserSlug(chapter.book.author)}/${
                        chapter.book.slug
                      }/${getChapterPage(chapter)}/edit`,
                      state: { chapter },
                    })
                  }}
                >
                  Edit page
                </a>
              </li>
            )}
            <li>
              <a href onClick={() => setShowDeleteConfirmation(true)}>
                Delete page
              </a>
            </li>
          </ul>
        </div>
      </div>

      {showDeleteConfirmation && (
        <ConfirmationModal
          show={showDeleteConfirmation}
          close={() => {
            setShowDeleteConfirmation(false)
            hide()
          }}
          onDelete={() => {
            onDelete()
          }}
        />
      )}
    </>
  )
}
