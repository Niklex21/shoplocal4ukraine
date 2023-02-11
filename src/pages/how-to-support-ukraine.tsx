import { Page } from "@appTypes/landing"
import { LandingLayout } from "@components/layouts/landing"
import { ReactElement } from "react"
import About from "./about"
import { NextPageWithLayout } from "./_app"

const HowToSupportUkraine : NextPageWithLayout = () => {
    return (
        <></>
    )
}

HowToSupportUkraine.getLayout = function getLayout(page: ReactElement) {
    return (
        <LandingLayout current={ Page.HowToSupport }>
            { page }
        </LandingLayout>
    )
}

export default About
