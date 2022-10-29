import { ReactNode } from 'react'

import Footer from './Footer'
import Head from 'next/head'
import favicon from '@public/images/favicon.png'

interface Props {
    children?: ReactNode
}

export default function LandingMainLayout({ children }: Props) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href={ favicon.src } />
                <title key="title">Shop Local 4 Ukraine</title>
            </Head>
            <div>
                { children }
                <Footer />
            </div>
        </>
    )
}
