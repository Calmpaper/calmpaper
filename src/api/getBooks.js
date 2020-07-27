import client from './client'
import { getBooksQuery } from './books/queries'

export const getBooks = async () => {
  const {
    data: { books },
  } = await client.query(getBooksQuery).toPromise()
  console.log('books')
  console.log(books)

  return books
}
