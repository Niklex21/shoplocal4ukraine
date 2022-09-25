import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import MainLayout from '@component/layout/Main'
import { ThemeProvider } from "@material-tailwind/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
    <MainLayout>
      <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </MainLayout>
    </ThemeProvider>
  )
}

export default MyApp
