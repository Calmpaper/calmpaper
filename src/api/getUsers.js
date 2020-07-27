import client from './client'
import { getUsersQuery } from './users/queries'

export const getUsers = async () => {
  const {
    data: { users },
  } = await client.query(getUsersQuery).toPromise()

  return users
}
