import Head from 'next/head'
import { PageTransition } from 'next-page-transitions'
import { Provider as URQLProvider } from 'urql'
import UserProvider from 'context/UserContext'

import 'assets/css/main.css'
import 'assets/css/index.css'
import 'assets/css/yandex.css'
import 'assets/sass/main.scss'

import client from 'api/client'
import * as atoms from 'components/atoms'

const Providers = ({ children }) => (
  <URQLProvider value={client}>
    <UserProvider>{children}</UserProvider>
  </URQLProvider>
)

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Calmpaper</title>
        <meta name="description" content="A place to write" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="application-name" content="Calmpaper" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Calmpaper" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="msapplication-config"
          content="/static/icons/browserconfig.xml"
        />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta charSet="utf-8" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
      </Head>
      <Providers>
        <PageTransition
          timeout={400}
          loadingComponent={<atoms.loader />}
          loadingTimeout={{
            enter: 400,
            exit: 0,
          }}
          classNames="page-transition"
          loadingClassNames="loading-indicator"
        >
          <Component {...pageProps} />
        </PageTransition>
      </Providers>
      <style jsx>
        {`
          @font-face {
            font-family: 'Inter';
            src: url(/fonts/Inter-Light.woff);
            src: url(/fonts/Inter-Regular.woff);
            src: url(/fonts/Inter-Medium.otf);
            src: url(/fonts/Inter-SemiBold.otf);
            src: url(/fonts/Inter-Bold.woff);
          }

          @font-face {
            font-family: 'Avetra';
            src: url(/fonts/AvertaLight.otf);
            src: url(/fonts/AvertaRegular.otf);
            src: url(/fonts/AvertaSemibold.otf);
            src: url(/fonts/AvertaBold.otf);
            src: url(/fonts/AvertaExtraBold.otf);
          }
        `}
      </style>
    </>
  )
}

export default App
