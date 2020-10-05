import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from 'context'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from 'urql'
import { createChapterMutation, updateChapterMutation } from 'api'

import Header from 'components/Layout/Header'
import Editor from 'components/Editor'

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest() // eslint-disable-line no-undef
    xhr.open('POST', 'https://api.imgur.com/3/image')
    xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca')
    const data = new FormData() // eslint-disable-line no-undef
    data.append('image', file)
    xhr.send(data)
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText)
      resolve(response)
    })
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText)
      reject(error)
    })
  })
}

export default () => {
  const { user } = useContext(UserContext)
  const { book: bookId } = useParams()
  const { push } = useHistory()
  const { state: { chapter } = {} } = useLocation()
  const { register, control, handleSubmit, errors } = useForm({
    defaultValues: chapter
      ? {
          title: chapter.title,
          content: chapter.content,
        }
      : {},
  })

  const submit = (data) => {
    if (chapter) {
      updateChapter({
        ...data,
        chapterId: chapter.id,
      }).then(({ data: { updateOneChapter: chapter } }) => {
        const chapterPage =
          chapter.book.chapters.findIndex((c) => c.id === chapter.id) + 1

        push({
          pathname: `/books/${bookId}/${chapterPage}`,
          // state: { showSharePopup: true },
        })
      })
    } else {
      createChapter({
        ...data,
        userId: user.id,
        bookId: parseInt(bookId),
      }).then(({ data: { createOneChapter: chapter } }) => {
        console.log(chapter.book.chapters)

        window.analytics &&
          window.analytics.track('create-chapter', {
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            bookId: chapter.book.id,
            bookName: chapter.book.name,
          })
        const chapterPage =
          chapter.book.chapters.findIndex((c) => c.id === chapter.id) + 1
        push({
          pathname: `/books/${bookId}/${chapterPage}`,
          state: { showSharePopup: true },
        })
      })
    }
  }

  const [, updateChapter] = useMutation(updateChapterMutation)
  const [{ fetching, error }, createChapter] = useMutation(
    createChapterMutation,
  )
  if (error) return <p>Oh no... {error.message}</p>

  const [editorRef, setEditorRef] = useState(null)

  return (
    <>
      <Header />
      <div className="page-profile-add-series">
        <div className="pagination"></div>
        <div className="add-series">
          <form
            className="container"
            style={{
              border: 0,
              paddingTop: 0,
              marginTop: 0,
            }}
            onSubmit={(e) => {
              if (
                e.nativeEvent.submitter.className.indexOf('menubar__button') >
                -1
              ) {
                e.preventDefault()
              } else {
                handleSubmit(submit)(e)
              }
            }}
          >
            {/*
            <FileInput setImage={setImage} />
            */}
            <div className="block block02 add-series-title">
              <h3 className="title size04">
                Title
                {errors.title && (
                  <span className="red-title">{` (required)`}</span>
                )}
              </h3>
              <input
                name="title"
                type="text"
                className="input"
                placeholder="Title"
                ref={register({ required: true })}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // e.preventDefault()
                    // document
                    //   .getElementsByClassName('menubar__button is-active')[0]
                    //   .unfocus()
                    // document
                    //   .getElementsByClassName('menubar__button')[0]
                    //   .click()
                    // e.preventDefault()
                    // editorRef.focus()
                  }
                }}
              />
            </div>
            <div className="block block03 add-series-desc">
              <h3 className="title size04">
                Content
                {errors.description && (
                  <span className="red-title">{` (required)`}</span>
                )}
              </h3>
              <Controller name="content" control={control} as={Editor} />
            </div>
            <div className="block block09 add-series-btn">
              {chapter ? (
                <button className="btn btn-color" type="submit">
                  {!fetching ? 'Save' : 'Saving...'}
                </button>
              ) : (
                <button className="btn btn-color" type="submit">
                  {!fetching ? 'Add page' : 'Adding...'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {/*
      <Footer centered />
      */}
    </>
  )
}
