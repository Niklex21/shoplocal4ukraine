import { ReactNode } from 'react'

import Head from 'next/head'
import favicon from '@public/images/favicon.png'

interface Props {
    children?: ReactNode
}

export default function AppMainLayout({ children }: Props) {

    return (
        <>
            <Head>
                <link rel="shortcut icon" href={ favicon.src } />
                <title key="title">Shop Local 4 Ukraine</title>
            </Head>
            <div className="h-screen w-screen p-0 m-0 bg-slate-50 max-h-screen flex">
                { children }
            </div>
        </>
    )
}
