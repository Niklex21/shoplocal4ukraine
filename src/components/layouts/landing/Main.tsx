import { ReactNode } from 'react'

import Footer from './Footer'
import Head from 'next/head'
import favicon from '@public/images/favicon.png'
import Navbar from './Navbar'
import strings from '@utils/strings'

interface Props {
    children?: ReactNode
}

export default function LandingMainLayout({ children }: Props) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href={ favicon.src } />
                <title key="title">{ strings.all.title }</title>
            </Head>
            <div className="bg-white">
                <Navbar current="" />
                { children }
                <Footer />
            </div>
        </>
    )
}