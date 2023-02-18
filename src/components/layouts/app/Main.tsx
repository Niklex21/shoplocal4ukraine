import { ReactNode } from 'react'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Script from 'next/script'
import GenericLayout from '../Generic'

type Props = {
    children?: ReactNode
}

export default function AppMainLayout({ children }: Props) {

    return (
        <>
            <GenericLayout>
                <Script id="mcjs">
                    {`
                        !function(c,h,i,m,p){
                            m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)
                        }(document,"script","https://chimpstatic.com/mcjs-connected/js/users/5294169e3c5e26832ef9cc671/6ac9341a1aa166e2f49201439.js");
                    `}
                </Script>
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
            </GenericLayout>
        </>
    )
}
