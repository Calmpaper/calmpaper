import client from './client'
import { getChaptersQuery } from './chapters/queries'

export const getChapters = async () => {
  const {
    data: { chapters },
  } = await client.query(getChaptersQuery).toPromise()

  return chapters
}
