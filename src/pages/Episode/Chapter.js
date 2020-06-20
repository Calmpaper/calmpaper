// Chapter - is the same as episode, but text version
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'context'
import { useMutation } from 'urql'
import { createVoiceMutation } from 'api'

import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from 'urql'
import { getChapterByBookQuery } from 'api'

import Loader from 'components/Loader'
import AddVoice from 'components/Misc/AddAudioButton'

export default () => {
  const [voice, setVoice] = useState(null)
  const { book: bookId, chapter: chapterPage } = useParams()
  const { push } = useHistory()
  const { username } = useContext(UserContext)

  const [{ data: { chapterByBook = [] } = {}, fetching, error }] = useQuery({
    query: getChapterByBookQuery,
    variables: {
      bookId: parseInt(bookId),
      skip: parseInt(chapterPage) - 1,
    },
  })
  const chapter = chapterByBook[0]

  const [createVoiceData, createVoice] = useMutation(createVoiceMutation)

  useEffect(() => {
    if (voice) {
      createVoice({
        url: voice,
        username,
        chapterId: parseInt(chapter.id),
      }).then(({ data: { createOneVoice: res } = {} }) => {
        push(`/books/${bookId}/${chapterPage}`)
      })
    }
  }, [voice])

  if (createVoiceData.error) {
    return <p>Oh no... {createVoiceData.error.message}</p>
  }

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="story">
      <AddVoice setVoice={setVoice} />
      <antcmd-editor vce-ready>
        <div className="page">
          <div className="editor">
            <div className="editor__content">
              <div contentEditable="true" tabIndex={0} className="ProseMirror">
                {chapter.content}
              </div>
            </div>
          </div>
        </div>
      </antcmd-editor>
      {/*
       */}
    </div>
  )
}
