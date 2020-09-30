import React, { useState, useContext, useEffect, useRef } from 'react'
import { UserContext } from 'context'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'
import { createChapterMutation, updateChapterMutation } from 'api'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

// import TextareaAutosize from 'react-textarea-autosize'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import Editor from 'react-medium-editor'
import Header from 'components/Layout/Header'
// import Editor from 'components/Editor'
import Footer from 'components/molecules/footer'

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
  const [value, setValue] = useState('')
  const { book: bookId } = useParams()
  const { push } = useHistory()
  const { state: { chapter } = {} } = useLocation()
  const { register, handleSubmit, errors } = useForm({
    defaultValues: chapter
      ? {
          title: chapter.title,
          content: htmlToDraft(chapter.content),
        }
      : {},
  })
  useEffect(() => {
    if (chapter) {
      const contentBlock = htmlToDraft(chapter.content)
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      )
      const editorState = EditorState.createWithContent(contentState)
      setValue(editorState)
    }
  }, [chapter])

  const submit = (data) => {
    if (chapter) {
      updateChapter({
        ...data,
        content: draftToHtml(convertToRaw(value.getCurrentContent())),
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
        content: draftToHtml(convertToRaw(value.getCurrentContent())),
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    console.log('yoyo')
                    editorRef.focus()
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
              <Editor
                editorState={value}
                toolbarClassName="toolbarClassName"
                wrapperClassName="input"
                editorClassName="editorClassName"
                editorRef={(ref) => setEditorRef(ref)}
                stripPastedStyles={true}
                toolbar={{
                  options: ['inline', 'list', 'link', 'emoji', 'image'],
                  inline: {
                    options: ['bold', 'italic', 'underline', 'strikethrough'],
                  },
                  list: {
                    options: ['unordered', 'ordered'],
                  },
                  link: {
                    showOpenOptionOnHover: false,
                    defaultTargetOption: '_blank',
                    options: ['link'],
                  },
                  image: {
                    uploadCallback: uploadImageCallBack,
                    alt: { present: true, mandatory: false },
                  },
                }}
                onEditorStateChange={(editorState) => {
                  console.log('editorState')
                  console.log(editorState)
                  setValue(editorState)
                }}
              />
              {/*
              <Editor
                text={value}
                onChange={(text) => setValue(text)}
                className="input"
                style={{ minHeight: 300 }}
              />
*/}
              {/*
              <TextareaAutosize
                name="content"
                type="text"
                className="input textarea"
                placeholder="Content"
                defaultValue={''}
                ref={register({ required: true })}
                minRows={6}
              />
            */}
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
      <Footer centered />
    </>
  )
}
