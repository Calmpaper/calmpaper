import React from 'react'
import { BrowserRouter as RouterProvider } from 'react-router-dom'
import UserProvider from 'context/UserContext'
import ModalProvider from 'context/ModalContext'
import GetStreamProvider from 'context/GetStreamContext'
import StripeProvider from 'context/StripeContext'
import { Provider as URQLProvider, createClient } from 'urql'

const urqlClient = createClient({
  url: process.env.REACT_APP_BACKEND_URL,
  fetchOptions: () => {
    const token = window.localStorage.getItem('jwt')

    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    }
  },
})

const Providers = ({ children }) => (
  <URQLProvider value={urqlClient}>
    <RouterProvider>
      <UserProvider>
        <StripeProvider>
          <GetStreamProvider>
            <ModalProvider>{children}</ModalProvider>
          </GetStreamProvider>
        </StripeProvider>
      </UserProvider>
    </RouterProvider>
  </URQLProvider>
)

export default Providers
