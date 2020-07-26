import React from 'react'

export default () => (
  <div
    className="main-search"
    style={{ display: 'flex', justifyContent: 'center' }}
  >
    <a href={`https://calmpaper.com/books/8`}>
      <button type="submit" style={{ position: 'relative', width: 139 }}>
        Learn more
      </button>
    </a>
  </div>
)

// export default () => (
//   <form action="http://dev08.morozovoleg.com/home.html" className="main-search">
//     <svg className="icon icon-search">
//       <use xlinkHref="#icon-search" />
//     </svg>
//     <input
//       type="text"
//       placeholder="Enter the name of the author, book or genre"
//     />
//     <button type="submit" onClick={(e) => e.preventDefault()}>
//       Search
//     </button>
//   </form>
// )
