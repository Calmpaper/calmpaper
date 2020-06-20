import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DiscussionEmbed } from 'disqus-react'

// export default () => <div />
// export default ()

export default () => {
  const { book, chapter } = useParams()
  useEffect(() => {
    ;(function () {
      // DON'T EDIT BELOW THIS LINE
      var d = document,
        s = d.createElement('script')
      s.src = 'https://voicestory.disqus.com/embed.js'
      s.setAttribute('data-timestamp', +new Date())
      ;(d.head || d.body).appendChild(s)
    })()
  }, [])
  useEffect(() => {
    window.disqus_config = {
      identifier: `${book ? `book${book}` : ''}${
        chapter ? `chapter${chapter}` : ''
      }`,
      url: `/${book ? `book${book}` : ''}${chapter ? `chapter${chapter}` : ''}`,
      title: `${book ? `book${book}` : ''}${
        chapter ? `chapter${chapter}` : ''
      }`,
      language: 'zh_TW', //e.g. for Traditional Chinese (Taiwan)
    }
  }, [book, chapter])

  return <div id="disqus_thread"></div>
}
// export default React.memo(
//   ({
//     url = 'http://localhost:3000/books/1',
//     id = 'book1',
//     title = 'title',
//   }) => {
//     const { book, chapter } = useParams()
//     console.log('id')
//     console.log(id)
//     console.log('url')
//     console.log(url)
//     console.log('title')
//     console.log(title)
//     // return (
//     //   <DiscussionEmbed
//     //     shortname="stories-o"
//     //     config={{
//     //       identifier: `episode1`,
//     //       url: `/books/1/1`,
//     //       title: `Computer Controlled Acoustic Instruments`,
//     //       language: 'zh_TW', //e.g. for Traditional Chinese (Taiwan)
//     //     }}
//     //   />
//     // )
//     return (
//       <DiscussionEmbed
//         shortname="voicestory"
//         config={{
//           identifier: id,
//           url: `/${book ? `book${book}` : ''}${
//             chapter ? `chapter${chapter}` : ''
//           }`,
//           title: `${book ? `book${book}` : ''}${
//             chapter ? `chapter${chapter}` : ''
//           }`,
//           language: 'zh_TW', //e.g. for Traditional Chinese (Taiwan)
//         }}
//       />
//     )
//   },
// )
