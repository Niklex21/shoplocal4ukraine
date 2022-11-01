import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

import { LandingLayout } from "@layouts/landing"
import { Page } from "@appTypes/landing"


const Privacy : NextPageWithLayout = () => {
    return (
        <>
            Privacy
        </>
    )
}

Privacy.getLayout = function getLayout(page: ReactElement) {
    return (
        <LandingLayout current={ Page.Privacy }>
            { page }
        </LandingLayout>
    )
}

export default Privacy