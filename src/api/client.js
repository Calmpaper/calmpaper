import cookie from 'js-cookie'
import { createClient } from 'urql'

const client = createClient({
  url: 'http://localhost:4000',
  // url: process.env.REACT_APP_BACKEND_URL,
  fetchOptions: () => {
    // fetch('http://localhost:3000/api/auth/jwt')
    const token = cookie.get('token')
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    }
  },
})

export default client
