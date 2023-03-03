import { ReactNode } from 'react'

import Footer from './Footer'
import Navbar from './Navbar'
import { Page } from '@appTypes/landing'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
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
