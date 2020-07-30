import client from './client'
import { getUsersQuery } from './users/queries'

export const getUsers = async () => {
  const { data, error } = await client.query(getUsersQuery).toPromise()

  console.log('data')
  console.log(data)
  console.log(error)
  const users = data ? data.users : []
  return users
}
