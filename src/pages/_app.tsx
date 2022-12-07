export { reportWebVitals } from 'next-axiom'

import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { StyledEngineProvider } from '@mui/material/styles'
import { Analytics } from '@vercel/analytics/react';
import {ErrorBoundary} from 'react-error-boundary'
import { processError } from '@api/_error'
import ErrorFallback from '@components/common/ErrorFallback'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <ErrorBoundary
      FallbackComponent={ ErrorFallback }
      onError={ (err: Error, { componentStack } : { componentStack: string }) => processError(err, componentStack) }
    >
      <StyledEngineProvider injectFirst>
        <Component {...pageProps} />
        <Analytics />
      </StyledEngineProvider>
    </ErrorBoundary>
  )
}

export default MyApp
