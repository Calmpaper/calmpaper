import { createClient } from 'urql'

const client = createClient({
  // url: process.env.REACT_APP_BACKEND_URL,
  url: 'http://localhost:4000/',
  fetchOptions: () => {
    // const token = window.localStorage.getItem('jwt')
    const token = null
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    }
  },
})

export default client
