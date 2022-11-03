import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

import { LandingLayout } from "@layouts/landing"
import { Page } from "@appTypes/landing"

const About : NextPageWithLayout = () => {
    return (
        <>
            About
        </>
    )
}

About.getLayout = function getLayout(page: ReactElement) {
    return (
        <LandingLayout current={ Page.About }>
            { page }
        </LandingLayout>
    )
}

export default About
