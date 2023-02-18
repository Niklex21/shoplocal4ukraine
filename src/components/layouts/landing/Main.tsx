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
import GenericLayout from '../Generic'

type Props = {
    children?: ReactNode,
    current?: Page
}

export default function LandingMainLayout({ children, current=Page.None }: Props) {

    return (
        <>
            <GenericLayout>
                <div className="bg-white">
                    <Navbar current={ current } />
                    { children }
                    <Footer />
                </div>
                <ToastContainer />
            </GenericLayout>
        </>
    )
}
