import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

import { LandingLayout } from "@layouts/landing"

const About : NextPageWithLayout = () => {
    return (
        <>
            About
        </>
    )
}

About.getLayout = function getLayout(page: ReactElement) {
    return (
        <LandingLayout>
            { page }
        </LandingLayout>
    )
}

export default About
