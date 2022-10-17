import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

import { LandingLayout } from "@layouts/landing"


const Privacy : NextPageWithLayout = () => {
    return (
        <>
            Privacy
        </>
    )
}

Privacy.getLayout = function getLayout(page: ReactElement) {
    return (
        <LandingLayout>
            { page }
        </LandingLayout>
    )
}

export default Privacy
