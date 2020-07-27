import client from './client'
import { getUserQuery } from './users/queries'

export const getUser = async (id) => {
  const { data } = await client
    .query(getUserQuery, { id: parseInt(id) })
    .toPromise()
  console.log('data')
  console.log(data)

  return { user: data.user }
}
