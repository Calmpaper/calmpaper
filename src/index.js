import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { createClient, Provider as URQLProvider } from 'urql'
import { BrowserRouter as RouterProvider } from 'react-router-dom'

import UserProvider from 'context/UserContext'
import ModalProvider from 'context/ModalContext'
import GetStreamProvider from 'context/GetStreamContext'
import StripeProvider from 'context/StripeContext'

import Layout from 'components/Layout/Layout'
import Routes from './routes'
import * as serviceWorker from './serviceWorker'

// import 'assets/sass/main.scss'

import 'assets/css/index.css'
// import 'assets/home02.scss'
// import 'assets/css/yandex.css'
import 'assets/css/main.css'

// import 'assets/css/stripe.css'

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
        <StripeProvider>
          <GetStreamProvider>
            <ModalProvider>{children}</ModalProvider>
          </GetStreamProvider>
        </StripeProvider>
      </UserProvider>
    </RouterProvider>
  </URQLProvider>
)

const App = () => {
  useEffect(() => {
    function init() {
      var analytics = (window.analytics = window.analytics || [])
      if (!analytics.initialize)
        if (analytics.invoked)
          window.console &&
            console.error &&
            console.error('Segment snippet included twice.')
        else {
          analytics.invoked = !0
          analytics.methods = [
            'trackSubmit',
            'trackClick',
            'trackLink',
            'trackForm',
            'pageview',
            'identify',
            'reset',
            'group',
            'track',
            'ready',
            'alias',
            'debug',
            'page',
            'once',
            'off',
            'on',
            'addSourceMiddleware',
            'addIntegrationMiddleware',
            'setAnonymousId',
            'addDestinationMiddleware',
          ]
          analytics.factory = function (e) {
            return function () {
              var t = Array.prototype.slice.call(arguments)
              t.unshift(e)
              analytics.push(t)
              return analytics
            }
          }
          for (var e = 0; e < analytics.methods.length; e++) {
            var t = analytics.methods[e]
            analytics[t] = analytics.factory(t)
          }
          analytics.load = function (e, t) {
            var n = document.createElement('script')
            n.type = 'text/javascript'
            n.async = !0
            n.src =
              'https://cdn.segment.com/analytics.js/v1/' +
              e +
              '/analytics.min.js'
            var a = document.getElementsByTagName('script')[0]
            a.parentNode.insertBefore(n, a)
            analytics._loadOptions = t
          }
          analytics.SNIPPET_VERSION = '4.1.0'
          analytics.load('AhAYO7EZnkW5R4zRVfuN4ceOY32pSDs4')
          analytics.page()
        }
    }
    init()
  }, [])
  return (
    <Layout>
      <Routes />
    </Layout>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
