import React from 'react'
import ReactDOM from 'react-dom'
import { createClient, Provider as URQLProvider } from 'urql'
import { BrowserRouter as RouterProvider } from 'react-router-dom'

import UserProvider from 'context/UserContext'
import ModalProvider from 'context/ModalContext'
import GetStreamProvider from 'context/GetStreamContext'

import Layout from 'components/Layout/Layout'
import Routes from './routes'

import 'assets/css/yandex.css'
import 'assets/sass/main.scss'
import 'assets/css/main.css'
import 'assets/css/index.css'

const client = createClient({
  url: process.env.REACT_APP_BACKEND_URL,
  fetchOptions: () => {
    const token = window.localStorage.getItem('jwt')
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    }
  },
})

const Providers = ({ children }) => (
  <URQLProvider value={client}>
    <RouterProvider>
      <UserProvider>
        <GetStreamProvider>
          <ModalProvider>{children}</ModalProvider>
        </GetStreamProvider>
      </UserProvider>
    </RouterProvider>
  </URQLProvider>
)

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <Layout>
        <Routes />
      </Layout>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
