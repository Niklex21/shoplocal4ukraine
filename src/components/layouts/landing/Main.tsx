import { ReactNode } from 'react'

import Navbar from './Navbar'
import Footer from './Footer'
import Head from 'next/head'

interface Props {
    children?: ReactNode
}

export default function LandingMainLayout({ children }: Props) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <div className="h-screen">
                { children }
                <Footer />
            </div>
        </>
    )
}