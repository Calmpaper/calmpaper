import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery } from 'urql'
import {
  createBookMutation,
  updateBookMutation,
  getGenresQuery,
  getTagsQuery,
} from 'api'

import TextareaAutosize from 'react-textarea-autosize'
import Header from 'components/Layout/Header'
import Footer from 'atomic/molecules/footer'
import FileInput from 'components/Input/FileInput'

import Genres from './Genres'
import Tags from './Tags'

export default () => {
  const { user } = useContext(UserContext)
  const { state: { book } = {} } = useLocation()
  const [image, setImage] = useState(book ? book.image : null)
  const { register, control, handleSubmit, errors, setValue } = useForm({
    defaultValues: book
      ? {
          image: book.image,
          name: book.name,
          description: book.description,
          tags: book.tags,
          genres: book.genres,
        }
      : {},
  })

  const { push } = useHistory()

  const [{ data: { genres = [] } = {} }] = useQuery({ query: getGenresQuery })
  const [{ data: { tags = [] } = {} }] = useQuery({ query: getTagsQuery })

  const submit = (data) => {
    const allData = {
      ...data,
      userId: parseInt(user.id),
      image,
      tags: (data.tags || []).map((i) => ({ id: i.value })),
      genres: (data.genres || []).map((i) => ({ id: i.id })),
    }
    if (book) {
      updateBook({ ...allData, bookId: book.id }).then(
        ({ data: { updateOneBook: book } }) => {
          push(`/books/${book.id}`)
        },
      )
    } else {
      createBook(allData).then(({ data: { createOneBook: book } }) => {
        window.analytics.track('create-book', {
          bookId: book.id,
          bookName: book.name,
        })
        push(`/books/${book.id}`)
      })
    }
  }

  const [, updateBook] = useMutation(updateBookMutation)
  const [{ fetching, error }, createBook] = useMutation(createBookMutation)
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
            <div
              className="block block01 add-series-img"
              style={{ marginTop: 0 }}
            >
              <h3 className="title size04">Image</h3>
              <FileInput setImage={setImage} />
            </div>

            <div className="block block02 add-series-title">
              <h3 className="title size04">
                Name
                {errors.name && (
                  <span className="red-title">{` (required)`}</span>
                )}
              </h3>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Enter name..."
                ref={register({ required: true })}
                autoFocus
              />
            </div>
            <div className="block block03 add-series-desc">
              <h3 className="title size04">
                Description
                {errors.description && (
                  <span className="red-title">{` (required)`}</span>
                )}
              </h3>
              <TextareaAutosize
                name="description"
                type="text"
                className="input textarea"
                placeholder="Enter your description"
                defaultValue={''}
                ref={register({ required: true })}
                minRows={6}
              />
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
              <button className="btn btn-color" type="submit">
                {!fetching ? 'Add series' : 'Adding...'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer centered />
    </>
  )
}
