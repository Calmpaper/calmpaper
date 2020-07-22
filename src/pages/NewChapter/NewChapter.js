import React, { useContext } from 'react'
import { UserContext } from 'context'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'
import { createChapterMutation, updateChapterMutation } from 'api'

import Header from 'components/Layout/Header'
import Footer from 'atomic/molecules/footer'

export default () => {
  const { user } = useContext(UserContext)
  const { book: bookId } = useParams()
  const { push } = useHistory()
  const { state: { chapter } = {} } = useLocation()
  const { register, handleSubmit, errors } = useForm({
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

        push(`/books/${bookId}/${chapterPage}`)
      })
    } else {
      createChapter({
        ...data,
        userId: user.id,
        bookId: parseInt(bookId),
      }).then(({ data: { createOneChapter: chapter } }) => {
        console.log(chapter.book.chapters)
        const chapterPage =
          chapter.book.chapters.findIndex((c) => c.id === chapter.id) + 1
        push(`/books/${bookId}/${chapterPage}`)
      })
    }
  }

  const [, updateChapter] = useMutation(updateChapterMutation)
  const [{ fetching, error }, createChapter] = useMutation(
    createChapterMutation,
  )
  if (error) return <p>Oh no... {error.message}</p>

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
            onSubmit={handleSubmit(submit)}
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
              />
            </div>
            <div className="block block03 add-series-desc">
              <h3 className="title size04">
                Content
                {errors.description && (
                  <span className="red-title">{` (required)`}</span>
                )}
              </h3>
              <textarea
                name="content"
                type="text"
                className="input textarea"
                placeholder="Content"
                defaultValue={''}
                ref={register({ required: true })}
              />
            </div>
            <div className="block block09 add-series-btn">
              <button className="btn btn-color" type="submit">
                {!fetching ? 'Add chapter' : 'Adding...'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer centered />
    </>
  )
}
