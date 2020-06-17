import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'
import { createChapterMutation } from 'api'

import { Form, Input, Textarea, Button, Error } from './NewChapter.styled'

export default () => {
  const { book: bookId } = useParams()
  const { push } = useHistory()
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    createChapter({
      ...data,
      bookId: parseInt(bookId),
    }).then(({ data: { createOneChapter: chapter } }) => {
      push(`/books/${bookId}`)
    })
  }

  const [{ data, fetching, error }, createChapter] = useMutation(
    createChapterMutation,
  )
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="title"
        placeholder="Title"
        ref={register({ required: true })}
      />
      {errors.title && <Error>Chapter title is required.</Error>}

      <Textarea
        name="content"
        placeholder="Content"
        ref={register({ required: true })}
      />
      {errors.content && <Error>Content is required.</Error>}

      <Button primary type="submit">
        {!fetching ? 'Add chapter' : 'Hold a moment...'}
      </Button>
    </Form>
  )
}
