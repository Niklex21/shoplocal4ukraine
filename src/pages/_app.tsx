import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import LandingMainLayout from '@layouts/landing/Main'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LandingMainLayout>
      <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </LandingMainLayout>
  )
}

export default MyApp
