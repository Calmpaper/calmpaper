import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from 'context'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery } from 'urql'
import {
  createBookMutation,
  updateBookMutation,
  getGenresQuery,
  getTagsQuery,
  createChapterMutation,
} from 'api'
import { getUserSlug } from 'helpers'

import Header from 'components/Layout/Header'
import FileInput from 'components/Input/FileInput'
import Editor from 'components/Editor'

import Genres from './Genres'
import Tags from './Tags'

export default () => {
  const { user } = useContext(UserContext)
  const draftKey = user && `bookDraft${user.id}`
  // const imageDraftKey = user && `bookImageDraft${user.id}`
  const draft = window && {
    ...JSON.parse(window.localStorage.getItem(draftKey)),
    // ...JSON.parse(window.localStorage.getItem(imageDraftKey)),
  }
  const { state: { book } = {} } = useLocation()
  const [image, setImage] = useState(book ? book.image : null/* draft?.image */)
  const { register, control, handleSubmit, errors, setValue, watch } = window && useForm({
    defaultValues: book
      ? {
          image: book.image,
          name: book.name,
          description: book.description,
          tags: book.tags,
          genres: book.genres,
        }
      : {
        // image: draft?.image,
        name: draft?.name,
        description: draft?.description,
        tags: draft?.tags,
        genres: draft?.genres,
      },
  })

  // useEffect(() => {
  //   image &&
  //     window &&
  //     !book &&
  //     window.localStorage.setItem(imageDraftKey, JSON.stringify({ image }))
  // }, [image])

  window &&
    user &&
    window.localStorage.setItem(draftKey, JSON.stringify({ ...watch() }))
  console.log(draft)
  const { push } = useHistory()

  const [{ fetching: chapterFetching }, createChapter] = useMutation(
    createChapterMutation,
  )

  const [{ data: { genres = [] } = {} }] = useQuery({ query: getGenresQuery })
  const [{ data: { tags = [] } = {} }] = useQuery({ query: getTagsQuery })

  const submit = (data) => {
    const allData = {
      ...data,
      userId: parseInt(user.id),
      image,
      tags: (data.tags || []).map((i) => i.value),
      genres: (data.genres || []).map((i) => i.id),
    }
    if (book) {
      updateBook({ ...allData, bookId: book.id }).then(
        ({ data: { updateOneBook: book } }) => {
          push(`/${getUserSlug(book.author)}/${book.slug}`)
        },
      )
    } else {
      createBook(allData).then(async ({ data: { createBook: book } }) => {
        window.analytics &&
          window.analytics.track('create-book', {
            bookId: book.id,
            bookName: book.name,
          })
        await createChapter({
          title: allData.name,
          content: allData.description,
          userId: user.id,
          bookId: undefined,
          bookSlug: book.slug,
        })
        window.localStorage && window.localStorage.removeItem(draftKey)
        // window.localStorage && window.localStorage.removeItem(imageDraftKey)
        push({
          pathname: `/${getUserSlug(user)}/${book.slug}`,
          // state: { showBookPublishedOverlay: true },
        })
      })
    }
  }

  const [, updateBook] = useMutation(updateBookMutation)
  const [{ fetching, error }, createBook] = useMutation(createBookMutation)
  if (error) return <p>Oh no... {error.message}</p>

  const isEditing = !!book

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
            <div
              className="block block01 add-series-img"
              style={{ marginTop: 0 }}
            >
              <h3 className="title size04">Cover image (Optional)</h3>
              <FileInput setImage={setImage} />
            </div>

            <div className="block block02 add-series-title">
              <h3 className="title size04">
                Title*
                {errors.name && (
                  <span className="red-title">{` (required)`}</span>
                )}
              </h3>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Enter name"
                ref={register({ required: true })}
                autoFocus
              />
            </div>
            <div className="block block03 add-series-desc">
              <h3 className="title size04">
                Description*
                {errors.description && (
                  <span className="red-title">{` (required)`}</span>
                )}
              </h3>
              <Controller name="description" control={control} as={Editor} />
              {/*
              <TextareaAutosize
                name="description"
                type="text"
                className="input textarea"
                placeholder="Enter your description"
                defaultValue={''}
                ref={register({ required: true })}
                minRows={6}
              />
              */}
            </div>
            <Controller
              name="genres"
              control={control}
              as={Genres}
              genres={genres}
              setValue={setValue}
            />
            <Controller name="tags" control={control} as={Tags} tags={tags} />
            <div className="block block09 add-series-btn">
              {isEditing ? (
                <button className="btn btn-color" type="submit">
                  {!fetching ? 'Save' : 'Saving...'}
                </button>
              ) : (
                <button className="btn btn-color" type="submit">
                  {!(fetching || chapterFetching) ? 'Publish' : 'Publishing...'}
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
