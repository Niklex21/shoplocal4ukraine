import { ReactNode } from 'react'

import Footer from './Footer'
import Head from 'next/head'
import favicon from '@public/images/favicon.png'
import Navbar from './Navbar'
import strings from '@utils/strings'
import { Page } from '@appTypes/landing'

interface Props {
    children?: ReactNode,
    current?: Page
}

export default function LandingMainLayout({ children, current=Page.None }: Props) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href={ favicon.src } />
                <title key="title">{ strings.all.title }</title>
            </Head>
            <div className="bg-white">
                <Navbar current={ current } />
                { children }
                <Footer />
            </div>
        </>
    )
}
