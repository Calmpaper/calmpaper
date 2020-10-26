import React, { useContext } from 'react'
import { UserContext } from 'context'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from 'urql'
import { createChapterMutation, updateChapterMutation } from 'api'
import { getUserSlug, removeHtmlTags } from 'helpers'

import Header from 'components/Layout/Header'
import Flex from 'components/atoms/flex'
import Editor from 'components/Editor'

function countWords(str = '') {
  return str.trim().split(/\s+/).length
}

export default () => {
  const { user } = useContext(UserContext)
  const { bookId, bookSlug } = useParams()
  const { push } = useHistory()
  const { state: { chapter } = {} } = useLocation()
  const { register, control, handleSubmit, errors, watch } = useForm({
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
          pathname: `/${getUserSlug(user)}/${chapter.book.slug}/${chapterPage}`,
        })
      })
    } else {
      createChapter({
        ...data,
        userId: user.id,
        bookId: bookId ? parseInt(bookId) : undefined,
        bookSlug: bookSlug,
      }).then(({ data: { createChapter: chapter } }) => {
        window.analytics &&
          window.analytics.track('create-chapter', {
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            bookId: chapter.book.id,
            bookSlug: chapter.book.slug,
            bookName: chapter.book.name,
          })
        const chapterPage =
          chapter.book.chapters.findIndex((c) => c.id === chapter.id) + 1
        push({
          pathname: `/${getUserSlug(user)}/${chapter.book.slug}/${chapterPage}`,
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

  const watchContent = watch('content')
  // const is140words = countWords(removeHtmlTags(watchContent || '', true)) >
  // 140

  var cont = watchContent || ''
  cont = cont.replace(/<[^>]*>/g, ' ')
  cont = cont.replace(/\s+/g, ' ')
  cont = cont.trim()
  var n = cont.split(' ').length
  const is1000words = n >= 1000

  return (
    <>
      <Header />
      <div
        className="page-profile-add-series"
        style={{ paddingBottom: '200px' }}
      >
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
              <Controller
                name="content"
                control={control}
                as={Editor}
                style={is1000words ? { border: '2px solid  #7057d2' } : {}}
              />
              <Flex row justifyEnd>
                <span
                  style={{
                    marginTop: 4,
                    fontSize: '14px',
                    color: 'rgba(0, 0, 0, .5)',
                  }}
                >
                  {n > 1 ? `${n} words` : ''}
                </span>
                {is1000words && (
                  <div
                    style={{
                      color: '#7057d2',
                      fontWeight: 500,
                      marginTop: 12,
                      fontSize: '15px',
                    }}
                  >
                    We recommend less than 1000 words per page for better
                    reading experience. You can add more pages.
                  </div>
                )}
              </Flex>
            </div>
            <div
              className="block block09 add-series-btn"
              style={{ display: 'flex' }}
            >
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
