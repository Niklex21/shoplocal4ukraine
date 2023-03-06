import { ReactNode, useState } from 'react'

import Head from 'next/head'
import favicon from '@public/images/favicon.png'
import strings from '@utils/strings'
import 'react-toastify/dist/ReactToastify.css';
import metaImage from "@public/images/meta_image.jpg"
import { PanelState } from '@appTypes/businesses'
import FeedbackPanel from '@components/business/FeedbackPanel'
import { Feedback } from '@mui/icons-material'

type Props = {
    children?: ReactNode,
    title?: string
}

export default function GenericLayout({ children, title }: Props) {

    const [ feedbackPanelState, setFeedbackPanelState ] = useState<PanelState>(PanelState.Closed)

    return (
        <>
            <Head>
                <link rel="shortcut icon" href={ favicon.src } />
                <meta
                    name="description"
                    content={ strings.all.meta.description }
                    key="desc"
                />
                <meta property="og:title" content={ strings.all.title } />
                <meta
                    property="og:description"
                    content={ strings.all.meta.description }
                />
                <meta
                    property="og:image"
                    content={ metaImage.src }
                />
            </Head>
            { children }
            {/* FEEDBACK TIP */}
            <div className="hidden md:flex -rotate-90 gap-2 fixed right-0 origin-bottom-right top-1/4 flex-row z-40 bg-ukraine-blue dark:bg-ukraine-yellow cursor-pointer hover:bg-ukraine-yellow dark:hover:bg-ukraine-blue hover:text-oxford-blue dark:hover:text-white text-white dark:text-oxford-blue px-4 py-2 rounded-t-md" onClick={ () => setFeedbackPanelState(PanelState.Open) }>
                <Feedback />
                { strings.all.giveFeedback.short }
            </div>
            <FeedbackPanel
                panelState={ feedbackPanelState }
                closePanel={ () => setFeedbackPanelState(PanelState.Closed)}
            />
        </>
    )
}
