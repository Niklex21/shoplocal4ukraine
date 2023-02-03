import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"

import { LandingLayout } from "@layouts/landing"
import { Page } from "@appTypes/landing"
import type { Person } from "@appTypes/landing"
import strings from "@utils/strings"
import ImageAlex from "@public/images/team/alex.jpg"
import ImageArtem from "@public/images/team/artem.jpg"
import ImagePolina from "@public/images/team/polina.jpg"
import ImageRostyk from "@public/images/team/rostyk.jpg"
import ImageFedor from "@public/images/team/fedor.jpeg"
import { PersonCard } from "@components/landing/PersonCard"

const team : Array<Person> = [
    {
        name: "Artem Dinh",
        profilePictureURL: ImageArtem.src,
        role: "Co-founder/Ops Director",
        description: "Artem plays ping pong, hangs out with his friends, engages in geopolitical discussions, and spams thousands of Russians with anti-propaganda.",
        gifURL: "",
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
        linkedin: "https://linkedin.com/in/alex-nikanov",
        github: "https://github.com/niklex21"
    },
    {
        name: "Polina Kuzmenko",
        profilePictureURL: ImagePolina.src,
        role: "Graphic Designer",
        description: "Polina is always hungry for new experiences. Being creative is her lifestyle. She loves surfing and cuddling with her two cats.",
        gifURL: "",
        email: "polya.kuzmenko@gmail.com",
        linkedin: "https://www.linkedin.com/in/polina-kuzmenko-595b7819a/",
        website: "https://girlscorporation.com/",
        behance: "https://www.behance.net/kkuzmenkko"
    },
    {
        name: "Rostyslav Rozhok",
        profilePictureURL: ImageRostyk.src,
        role: "Database Curator",
        description: "In his free time from studies of engineering, Rostyslav likes to listen to music, drink white wine, and work on a book about time travel.",
        gifURL: "",
        email: "rostyslavrozhok1@gmail.com",
        instagram: "https://www.instagram.com/rostyslav_/"
    },
    {
        name: "Fedor Goryanyy",
        profilePictureURL: ImageFedor.src,
        role: "Software Engineer",
        description: "In his free time, Fedor bikes and bakes pastries.",
        gifURL: "",
        email: "fedorgny@gmail.com",
        linkedin: "https://www.linkedin.com/in/goryanyy/"
    }
]

const About : NextPageWithLayout = () => {

    return (
        <div className="flex flex-col w-full gap-10">

            {/* WHO WE ARE SECTION */}
            <div className="flex flex-col w-full p-8 md:p-16 justify-center justify-items-center gap-16">
                <h1
                    className="text-3xl md:text-5xl font-bold text-center text-black mx-auto p-2 before:block before:absolute before:-skew-x-12 before:-inset-1 before:bg-ukraine-yellow relative inline-block"
                >
                    <span className="relative text-black">{ strings.landing.about.whoWeAre.title }</span>
                </h1>
                <div className="text-4xl font-bold leading-relaxed text-center max-w-4xl mx-auto">
                    { strings.landing.about.whoWeAre.mission.m1 }
                    &nbsp;
                    <span className="text-ukraine-blue">{ strings.landing.about.whoWeAre.mission.h1 }</span>
                    &nbsp;
                    { strings.landing.about.whoWeAre.mission.m2 }
                    &nbsp;
                    <span className="text-ukraine-blue">{ strings.landing.about.whoWeAre.mission.h2 }</span>
                    &nbsp;
                    { strings.landing.about.whoWeAre.mission.m3 }
                    &nbsp;
                    <span className="text-ukraine-blue">{ strings.landing.about.whoWeAre.mission.h3 }</span>
                    &nbsp;
                    { strings.landing.about.whoWeAre.mission.m4 }
                </div>
            </div>

            {/* TEAM MEMBERS SECTION */}
            <div className="flex flex-col w-full p-8 md:p-16 justify-center justify-items-center gap-16">
                <text className="text-5xl font-bold mx-auto text-center px-4 py-2 before:block before:absolute before:-skew-x-12 before:-inset-1 before:bg-ukraine-yellow relative inline-block"><span className="text-black relative">{ strings.landing.about.teamSectionTitle }</span></text>
                <div className="mx-32 md:grid md:grid-cols-2 lg:grid-cols-3 justify-items-center items-start gap-16">
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
