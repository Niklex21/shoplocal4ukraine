import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

import { LandingLayout } from "@layouts/landing"
import { Page } from "@appTypes/landing"
import strings_en from "@utils/strings"


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

Privacy.title = strings_en.landing.privacy.title

export default Privacy
