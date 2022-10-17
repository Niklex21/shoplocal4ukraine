import { NextPage } from "next"
import { ReactElement } from "react"

import { LandingLayout } from "@layouts/landing"
import { NextPageWithLayout } from "./_app"


const Contact : NextPageWithLayout = () => {
    return (
        <>
            Contact
        </>
    )
}

Contact.getLayout = function getLayout(page: ReactElement) {
    return (
        <LandingLayout>
            { page }
        </LandingLayout>
    )
}

export default Contact