// Chapter - is the same as episode, but text version
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
                <h1 className>Title</h1>
              </div>
            </div>
          </div>
        </div>
      </antcmd-editor>
      {/*
      <h1>
        Arcflame, the strongest <br />
        tree-growing dragon
      </h1>
      <div className="chapter">
        “Arcflame! He is gone” A colossal centipede the size of a mountain
        screamed.
        <br />
        A group of bulls just as tall started stamping their hooves on the soil.
        <br />
        “Is this true.” A giant horse neighed. “Can we trust you colossal
        centipede!"
        <br />
        Millions of monsters now have their eyes on the centipede waiting in
        silence.
        <br />
        “I saw it my brothers. I can no longer sense him. I can’t sense him in
        the earth and giant eagle can’t sense him in the sky.”
        <br />
        “It’s true. I can feel everything in the sky. The evil dragon is truly
        gone.” Giant eagle yelled. “He must have died of old age!”
        <br />
        A pair of wings soared and an even more gigantic figure appeared. It was
        Arcflame’s younger brother, Infinite Rain.
        <br />
        “With my brother gone, this is our age. No longer, will we have to grow
        trees!”
        <br />
        The monsters cheered and screamed. The dark age was over.
      </div>
      <h2>Chapter 2</h2>
      <div className="chapter">
        “How long have we lived in fear?” Giant Eagle shouted as millions of
        monsters watched. His body covered the skies. “How long have we lived in
        terror?”
        <br />
        “No more!” Golden Phoenix shouted. Her feathers were bright like the
        sun.
        <br />
        “Are we not strong? Are we not powerful?” Giant Eagle yelled.
        <br />
        “We are the strongest!” Colossal Centipede shouted. The other monsters
        screamed in agreement.
        <br />
        “I will tell you about my dream last night. It was a dream of the earth
        without Arcflame. It reminded me of a song that I had long forgotten. It
        came back to me in my dream. This was a song that was sung by the
        monsters of long ago and was forgotten for generations. I will sing it
        for you, brothers and sisters. It is called Gods of the Earth.”
        <br />
        <br />
        Giant Eagle cleared his throat and began to sing.
        <br />
        <p>
          <br />
          Monsters of the Earth
          <br />
          Kings of the wild
          <br />
          Gods of every land and sea
          <br />
          Sooner or later
          <br />
          The day will come
          <br />
          Tyrant Arcflame will die
          <br />
          And the heart of the Earth
          <br />
          Shall be by our side
          <br />
          Humans will be servants
          <br />
          And elves shall be slaves
          <br />
          Fairies and sorcerers
          <br />
          Shall be ours upon that day
          <br />
          The trees will die
          <br />
          There won’t be any to fertilize
          <br />
          Monsters of the Earth
          <br />
          Kings of the wild
          <br />
          Gods of every land and sea
          <br />
        </p>
        <br />
        The monsters screamed in excitement. They stomped the ground causing
        giant earthquakes. Many monsters started learning the song. After
        awhile, all the monsters were singing it in harmony.
        <br />
        <br />
        Some monsters started embracing each other. Golden Phoenix flew up to
        fly with Giant Eagle. Terror Ice Monkey gave Devil Gorilla a hug. Even
        the usually cold and aloof Demon King gave Darkness Moon Bear a pad in
        the back.
        <br />
        The monsters were emotional. This was the song that started it all. A
        new era of change.
      </div>
      */}
    </div>
  )
}
