import client from './client'
import { getBookQuery } from './books/queries'

export const getBook = async (id) => {
  const { data: { book } = {} } = await client
    .query(getBookQuery, { id: parseInt(id) })
    .toPromise()

  return book
}
