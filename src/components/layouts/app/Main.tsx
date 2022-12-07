import { ReactNode, useState } from 'react'

import Head from 'next/head'
import favicon from '@public/images/favicon.png'
import strings from '@utils/strings'
import { Menu as IconMenu } from "@mui/icons-material"
import { IconButton, Tooltip } from '@mui/material'
import { PanelState } from '@appTypes/businesses'
import { AppMenu } from '../../common/AppMenu'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Script from 'next/script'
import { isMobile } from 'react-device-detect'
import { useAtom } from 'jotai'

type Props = {
    children?: ReactNode
}

export default function AppMainLayout({ children }: Props) {

    return (
        <>
            <Head>
                <link rel="shortcut icon" href={ favicon.src } />
                <title key="title">{ strings.all.title }</title>
            </Head>
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-P68Q0F71ED" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-P68Q0F71ED');
                `}
            </Script>
            <div className="h-screen w-screen p-0 m-0 bg-white max-h-screen flex">
                { children }
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                limit={3}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                className="z-40 min-h-0"
            />
        </>
    )
}
