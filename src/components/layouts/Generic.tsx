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
    children?: ReactNode
}

export default function GenericLayout({ children }: Props) {

    return (
        <>
            <Head>
                <link rel="shortcut icon" href={ favicon.src } />
                <title key="title">{ strings.all.title }</title>
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
        </>
    )
}
