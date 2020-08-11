import cookie from 'js-cookie'
import { createClient } from 'urql'

const client = createClient({
  url: 'http://localhost:3000/api/graphql',
  // url: process.env.REACT_APP_BACKEND_URL,
  fetchOptions: () => {
    const token = cookie.get('token')
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    }
  },
})

export default client
