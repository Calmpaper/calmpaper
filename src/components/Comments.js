import React from 'react'
import { DiscussionEmbed } from 'disqus-react'

export default () => <div />

// export default React.memo(
//   ({
//     url = 'http://localhost:3000/books/1',
//     id = 'book1',
//     title = 'title',
//   }) => (
//     <DiscussionEmbed
//       shortname="voicestory"
//       config={{
//         identifier: id,
//         url,
//         title,
//         language: 'zh_TW', //e.g. for Traditional Chinese (Taiwan)
//       }}
//     />
//   ),
// )
