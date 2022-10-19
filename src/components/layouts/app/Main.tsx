import { ReactNode } from 'react'

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
            <div className="h-screen w-screen p-0 m-0 bg-slate-50 max-h-screen flex">
                { children }
            </div>
        </>
    )
}