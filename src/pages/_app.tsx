export { reportWebVitals } from 'next-axiom'

import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { StyledEngineProvider } from '@mui/material/styles'
import { Analytics } from '@vercel/analytics/react';
import {ErrorBoundary} from 'react-error-boundary'
import { processError } from '@api/_error'
import ErrorFallback from '@components/common/ErrorFallback'
import localFont from '@next/font/local'
import strings from '@utils/strings'
import Head from 'next/head'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode,
  title?: string
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const eUkraine = localFont({
  src: [
    {
      path: '../public/fonts/e-Ukraine/e-Ukraine-Thin.otf',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../public/fonts/e-Ukraine/e-Ukraine-UltraLight.otf',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../public/fonts/e-Ukraine/e-Ukraine-Light.otf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../public/fonts/e-Ukraine/e-Ukraine-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/e-Ukraine/e-Ukraine-Medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/e-Ukraine/e-Ukraine-Bold.otf',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-eukraine'
})

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ErrorBoundary
      FallbackComponent={ ErrorFallback }
      onError={ (err: Error, { componentStack } : { componentStack: string }) => processError(err, componentStack) }
    >
      {
        getLayout(
          <StyledEngineProvider injectFirst>
            <Head>
              <title key="title">{ (Component.title ? (Component.title + " | ") : "") + strings.all.title }</title>
            </Head>
            <Component {...pageProps} />
            <Analytics />
          </StyledEngineProvider>
        )
      }
    </ErrorBoundary>
  )
}

export default MyApp
