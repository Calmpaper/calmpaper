// <title />
// <books sort={} filter={} />
import * as molecules from 'components/molecules'

export const books_feed = ({ books }) => (
  <div className="catalog catalog02">
    <div className="container">
      <div className="row">
        <h2 className="title size02">Latest series</h2>
      </div>

      <div className="row">
        {books.map((book) => (
          <molecules.book book={book} key={book.id} />
        ))}
      </div>
    </div>
  </div>
)

// import React from 'react'
// import { useQuery } from 'urql'
// import { getLatestBooksQuery } from 'api'

// import Loader from 'components/Loader'
// import Book from './Book'

// export default ({ sort }) => {
//   const [{ data: { books } = {}, fetching, error }] = useQuery({
//     query: getLatestBooksQuery,
//   })

//   if (fetching) return <Loader />
//   if (error) return <p>Oh no... {error.message}</p>

//   return (
//     <div className="catalog catalog02">
//       <div className="container">
//         <div className="row">
//           <h2 className="title size02">Latest series</h2>
//         </div>

//         <div className="row">
//           {books
//             .filter((b) => b.chapters.length > 0 && b.image)
//             .map((book) => (
//               <Book book={book} key={book.id} />
//             ))}
//         </div>
//       </div>
//     </div>
//   )
// }
