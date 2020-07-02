import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { getChapterByBookQuery } from 'api'

import Loader from 'components/Loader'

export default () => {
  const { book: bookId, chapter: chapterPage } = useParams()

  const [{ data: { chapterByBook = [] } = {}, fetching, error }] = useQuery({
    query: getChapterByBookQuery,
    variables: {
      bookId: parseInt(bookId),
      skip: parseInt(chapterPage) - 1,
    },
  })
  const chapter = chapterByBook[0]

  if (fetching) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className="story">
      <antcmd-editor vce-ready>
        <div className="page">
          <div className="editor">
            <div className="editor__content">
              <div contentEditable="true" tabIndex={0} className="ProseMirror">
                <h1>{chapter.title}</h1>
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
