import { ReactNode, useState } from 'react'

import Head from 'next/head'
import favicon from '@public/images/favicon.png'
import strings from '@utils/strings'
import { Menu as IconMenu } from "@mui/icons-material"
import { IconButton, Tooltip } from '@mui/material'
import { PanelState } from '@appTypes/businesses'
import { AppMenu } from './AppMenu'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Script from 'next/script'

type Props = {
    children?: ReactNode
}

export default function AppMainLayout({ children }: Props) {

    const [ menuState, setMenuState ] = useState<PanelState>(PanelState.Closed)

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
            <div className="h-screen w-screen p-0 m-0 bg-slate-50 max-h-screen flex">
                { children }
                <Tooltip title={ strings.app.tooltipMenuButton }>
                    <div
                        className="flex absolute top-2 left-2 z-10 p-1 bg-ukraine-blue hover:brightness-105 cursor-pointer rounded-lg drop-shadow-md"
                        onClick={ () => setMenuState(PanelState.Open) }
                    >
                        {/* the hover effect disables inner MUI hover circle bg */}
                        <IconButton
                            className={ "text-white text-3xl cursor-pointer hover:bg-inherit" }
                        >
                            <IconMenu />
                        </IconButton>
                    </div>
                </Tooltip>
                <div
                    className={
                        "absolute top-0 h-full w-full left-0 bg-black transition-opacity duration-500 " +
                        (menuState === PanelState.Closed ? "opacity-0 -z-50" : "opacity-20 z-50")
                    }
                    onClick={ () => setMenuState(PanelState.Closed) }
                />
                <AppMenu menuState={ menuState } setMenuState={ setMenuState } />
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
