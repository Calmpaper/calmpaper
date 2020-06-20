import React, { useState, useContext } from 'react'
import { UserContext } from 'context'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'
import { createBookMutation } from 'api'
import FileInput from 'components/Input/FileInput'

import { Form, Input, Textarea, Button, Error } from './NewBook.styled'

export default () => {
  const [image, setImage] = useState(null)
  const { username } = useContext(UserContext)
  const { register, handleSubmit, errors } = useForm()
  const { push } = useHistory()

  const submit = (data) => {
    const allData = { ...data, username, image }
    createBook(allData).then(({ data: { createOneBook: book } }) => {
      push(`/books/${book.id}`)
    })
  }

  const [{ data, fetching, error }, createBook] = useMutation(
    createBookMutation,
  )
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FileInput setImage={setImage} />

      <Input
        name="name"
        placeholder="Name of your story"
        ref={register({ required: true })}
      />
      {errors.name && <Error>Book name is required.</Error>}

      <Textarea
        name="description"
        placeholder="What's your story about?"
        ref={register({ required: true })}
      />
      {errors.description && <Error>Book description is required.</Error>}

      <Button primary type="submit">
        {!fetching ? 'Start your story' : 'Creating your universe...'}
      </Button>
    </Form>
  )
}
