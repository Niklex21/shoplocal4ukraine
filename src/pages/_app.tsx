import '../styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import MainLayout from '@component/layout/Main'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
