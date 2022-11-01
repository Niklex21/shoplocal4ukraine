import { Page } from "@appTypes/landing"
import { LandingLayout } from "@layouts/landing"
import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

const Join : NextPageWithLayout = () => {
    return (
        <>
            Join
        </>
    )
}

Join.getLayout = function getLayout(page: ReactElement) {
    return (
        <LandingLayout current={ Page.Join }>
            { page }
        </LandingLayout>
    )
}

export default Join