import React from 'react'
import { render } from 'react-dom'

import Layout from 'components/Layout/Layout'
import Providers from './providers'
import Routes from './routes'
import { useAnalytics } from './hooks'

import 'assets/css/main.css'

import 'assets/css/index.css'
import 'assets/css/yandex.css'
import 'assets/css/ADDITIONS.css'
import 'assets/css/editor.css'
import 'react-virtualized/styles.css'

import * as serviceWorker from './serviceWorker'

const App = () => {
  useAnalytics()

  return (
    <Providers>
      <Layout>
        <Routes />
      </Layout>
    </Providers>
  )
}

const rootElement = document.getElementById('root')
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement,
)

serviceWorker.register()
