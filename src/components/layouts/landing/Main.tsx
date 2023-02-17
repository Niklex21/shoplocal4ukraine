import { ReactNode, useState } from 'react'

import Footer from './Footer'
import Head from 'next/head'
import favicon from '@public/images/favicon.png'
import Navbar from './Navbar'
import strings from '@utils/strings'
import { Page } from '@appTypes/landing'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { PanelState } from '@appTypes/businesses'
import FeedbackPanel from '@components/business/FeedbackPanel'
import { Feedback } from '@mui/icons-material'

type Props = {
    children?: ReactNode,
    current?: Page
}

export default function LandingMainLayout({ children, current=Page.None }: Props) {

    const [ feedbackPanelState, setFeedbackPanelState ] = useState<PanelState>(PanelState.Closed)

    return (
        <>
            <Head>
                <link rel="shortcut icon" href={ favicon.src } />
                <title key="title">{ strings.all.title }</title>
            </Head>
            <div className="bg-white">
                {/* <Navbar current={ current } /> */}
                { children }
                {/* <Footer /> */}
            </div>
            {/* FEEDBACK TIP */}
            {/* <div className="flex -rotate-90 md:rotate-0 gap-2 fixed right-0 origin-bottom-right top-1/4 flex-row md:bottom-0 z-40 md:top-auto md:right-10 bg-ukraine-blue cursor-pointer hover:bg-ukraine-yellow hover:text-oxford-blue text-white px-4 py-2 rounded-t-md" onClick={ () => setFeedbackPanelState(PanelState.Open) }>
                <Feedback />
                { strings.all.giveFeedback.short }
            </div>
            <FeedbackPanel
                panelState={ feedbackPanelState }
                closePanel={ () => setFeedbackPanelState(PanelState.Closed)}
            />
            <ToastContainer /> */}
        </>
    )
}
