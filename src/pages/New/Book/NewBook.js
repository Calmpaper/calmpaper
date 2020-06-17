import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'
import { createBookMutation } from 'api'
import FileInput from 'components/Input/FileInput'

import { Form, Input, Textarea, Button, Error } from './NewBook.styled'

export default () => {
  const { register, handleSubmit, errors } = useForm()
  const { push } = useHistory()

  const onSubmit = (data) => {
    createBook(data).then(({ data: { createOneBook: book } }) => {
      push(`/books/${book.id}`)
    })
  }

  const [{ data, fetching, error }, createBook] = useMutation(
    createBookMutation,
  )
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FileInput />

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
