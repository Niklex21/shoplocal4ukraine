import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

import { LandingLayout } from "@layouts/landing"
import { Page } from "@appTypes/landing"
import type { Person } from "@appTypes/landing"
import strings from "@utils/strings"
import ImageAlex from "@public/images/team/alex.jpg"
import ImageArtem from "@public/images/team/artem.jpg"
import ImagePolina from "@public/images/team/polina.jpg"
import { PersonCard } from "@components/landing/PersonCard"

const team : Array<Person> = [
    {
        name: "Artem Dinh",
        profilePictureURL: ImageArtem.src,
        role: "Co-founder/Ops Director",
        description: "Artem plays ping pong, hangs out with his friends, engages in geopolitical discussions, and spams thousands of Russians with anti-propaganda.",
        gifURL: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f67a9a51-af2d-4337-bc66-d9f7a602cb72/peepo-ukraine.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221104T044320Z&X-Amz-Expires=86400&X-Amz-Signature=df4ce1bfbbc2ac0c0b14aaf356ca520f429522089dfc08d6a4b26ad38e56a299&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22peepo-ukraine.gif%22&x-id=GetObject",
        email: "tdinh02@tufts.edu",
        linkedin: "https://www.linkedin.com/in/long-artem-dinh/"
    },
    {
        name: "Alex Nikanov",
        profilePictureURL: ImageAlex.src,
        role: "Co-founder/Tech Director",
        description: "In his spare time Alex bakes cookies, rides his trusty mountain bike, and reads high fantasy novels.",
        gifURL: "https://thumbs.gfycat.com/DapperRightCommabutterfly-max-1mb.gif",
        email: "alekseynikanov.21@gmail.com",
        linkedin: "https://linkedin.com/in/alex-nikanov"
    },
    {
        name: "Polina Kuzmenko",
        profilePictureURL: ImagePolina.src,
        role: "Graphic Designer",
        description: "",
        gifURL: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/aa70cf9c-0bbe-493e-96bb-e51e571ff223/giphy.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221104T234344Z&X-Amz-Expires=86400&X-Amz-Signature=0a0fa33a8b21c16bdc351d96791883b8b53a0c99c64d855302d7cb59c82f3f2a&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22giphy.gif%22&x-id=GetObject",
        email: "polya.kuzmenko@gmail.com",
        linkedin: "https://www.linkedin.com/in/polina-kuzmenko-595b7819a/"
    }
]

const About : NextPageWithLayout = () => {
    return (
        <div className="flex flex-col w-full p-16 justify-center justify-items-center">
            <text className="text-5xl font-bold w-full text-center">{ strings.landing.about.teamSectionTitle }</text>
            <div className="mt-16 mx-32 md:grid md:grid-cols-2 lg:grid-cols-3 justify-items-center items-start gap-4">
                {
                    team.map(
                        (person: Person, index: number) => (
                            <PersonCard
                                key={ index }
                                { ...person }
                            />
                        )
                    )
                }
            </div>
        </div>
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