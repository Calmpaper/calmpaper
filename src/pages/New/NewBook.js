import React, { useState, useContext } from 'react'
import { UserContext, GetStreamContext } from 'context'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'
import { createBookMutation, updateBookMutation } from 'api'

import Header from 'components/Layout/Header'
import Footer from 'atomic/molecules/footer'
import FileInput from 'components/Input/FileInput'

export default () => {
  const { user } = useContext(UserContext)
  const { client, notificationsFeed, addActivity } = useContext(
    GetStreamContext,
  )
  const { state: { book } = {} } = useLocation()
  const [image, setImage] = useState(book ? book.image : null)
  const { register, handleSubmit, errors } = useForm({
    defaultValues: book
      ? {
          image: book.image,
          name: book.name,
          description: book.description,
        }
      : {},
  })
  const { push } = useHistory()

  const submit = (data) => {
    const allData = { ...data, userId: parseInt(user.id), image }
    if (book) {
      updateBook({ ...allData, bookId: book.id }).then(
        ({ data: { updateOneBook: book } }) => {
          push(`/books/${book.id}`)
        },
      )
    } else {
      createBook(allData).then(({ data: { createBook: book } }) => {
        // const bookFeed = client.feed('book', book.id)
        // notificationsFeed.follow('book', book.id)
        // console.log(bookFeed)
        // bookFeed.addActivity({
        //   actor: client.currentUser,
        //   to: [`user:${user.id}`],
        //   verb: 'start',
        //   object: `book:${book.id}`,
        //   book,
        //   user,
        // })
        push(`/books/${book.id}`)
      })
    }
  }

  const [_, updateBook] = useMutation(updateBookMutation)
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
              <textarea
                name="description"
                type="text"
                className="input textarea"
                placeholder="Enter your description"
                defaultValue={''}
                ref={register({ required: true })}
              />
            </div>
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
