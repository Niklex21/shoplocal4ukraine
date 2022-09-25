import { ReactNode } from 'react'

import Navbar from './Navbar'
import Footer from './Footer'

interface Props {
    children?: ReactNode
}

export default function MainLayout({ children }: Props) {
    return (
        <div className='box-border'>
            <Navbar />
            { children }
            <Footer />
        </div>
    )
}