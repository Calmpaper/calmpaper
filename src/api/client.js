import { createClient } from 'urql'

const client = createClient({
  url: 'https://ignatif.me/',
  fetchOptions: () => {
    // const token = window.localStorage.getItem('jwt')
    const token = null
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    }
  },
})

export default client
