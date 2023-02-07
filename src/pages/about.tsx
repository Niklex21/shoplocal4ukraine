import { ReactElement, useState } from "react"
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
import { ExpandLess, ExpandMore, Face, Store } from "@mui/icons-material"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import { INFO } from "@utils/config"
import Image from "next/image"
import roadmapHorizontal from "@public/images/roadmap_horizontal.svg"
import roadmapVertical from "@public/images/roadmap_vertical.svg"
import ImageWithFallback from "@components/common/ImageWithFallback"

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
        description: "Apart from going to school, Fedor also enjoys swimming, cooking, reading, and sharing food with his cat.",
        gifURL: "",
        email: "fedorgny@gmail.com",
        linkedin: "https://www.linkedin.com/in/goryanyy/"
    }
]

const About : NextPageWithLayout = () => {

    const [ faqOpenIndex, setFAQOpenIndex ] = useState<number>(-1)

    return (
        <div className="flex flex-col w-full gap-10 text-oxford-blue">

            {/* WHO WE ARE SECTION */}
            <div className="flex flex-col w-full p-8 md:p-16 justify-left justify-items-left md:justify-items-center gap-8 md:gap-16">
                <h1
                    className="text-3xl md:text-5xl font-bold text-left text-black mr-auto md:mx-auto flex p-2 before:block before:absolute before:-skew-x-12 before:-inset-1 before:bg-ukraine-yellow relative"
                >
                    <span className="relative text-black">{ strings.landing.about.whoWeAre.title }</span>
                </h1>
                <div className="text-2xl md:text-4xl font-bold text-left md:text-center max-w-4xl mx-auto">
                    <span className="leading-relaxed">
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
                    </span>
                </div>
            </div>

            {/* HOW THIS WORKS SECTION */}
            <div className="flex flex-col w-full p-8 md:p-16 gap-8 justify-left md:justify-center justify-items-center md:justify-items-start items-align-middle bg-alice-blue">
                <div className="flex flex-col md:grid md:grid-cols-3 gap-16">
                    <h1
                        className="flex text-3xl md:text-5xl font-bold text-left md:text-center mr-auto md:m-auto p-2 before:block before:absolute before:-skew-x-12 before:-inset-1 before:bg-ukraine-yellow relative"
                    >
                        <span className="relative">{ strings.landing.about.howThisWorks.title }</span>
                    </h1>
                    <div className="flex flex-col gap-10 col-span-2">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-8 align-middle">
                            <Face className="text-6xl my-auto text-ukraine-blue" />
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold text-2xl">{ strings.landing.about.howThisWorks.customer.title }</h1>
                                <text className="text-lg text-slate-700 leading-relaxed">{ strings.landing.about.howThisWorks.customer.text }</text>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 md:gap-8 align-middle">
                            <Store className="text-6xl my-auto text-ukraine-blue" />
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold text-2xl">{ strings.landing.about.howThisWorks.business.title }</h1>
                                <text className="text-lg text-slate-700 leading-relaxed">{ strings.landing.about.howThisWorks.business.text }</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHY WE DO THIS SECTION */}
            <div className="flex flex-col md:grid md:grid-cols-3 w-full justify-left md:justify-center justify-items-left md:justify-items-center items-align-middle p-8 md:p-16 gap-8">
                <h1
                    className="flex md:hidden text-3xl md:text-5xl font-bold text-center mr-auto md:m-auto p-2 before:block before:absolute before:-skew-x-12 before:-inset-1 before:bg-ukraine-yellow relative"
                >
                    <span className="relative">{ strings.landing.about.whyWeDoIt.title }</span>
                </h1>
                <div className="text-lg md:text-2xl leading-loose col-span-2 text-slate-700 text-left max-w-4xl mx-auto">
                    <span className="leading-relaxed">{ strings.landing.about.whyWeDoIt.content }</span>
                </div>
                <h1
                    className="hidden md:flex text-3xl md:text-5xl font-bold text-center m-auto p-2 before:block before:absolute before:-skew-x-12 before:-inset-1 before:bg-ukraine-yellow relative"
                >
                    <span className="relative">{ strings.landing.about.whyWeDoIt.title }</span>
                </h1>
            </div>

            {/* FAQ SECTION */}
            <div className="flex flex-col w-full p-8 md:p-16 gap-8 justify-center justify-items-center items-align-middle bg-alice-blue">
                <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
                    <h1
                        className="flex text-3xl md:text-5xl font-bold text-center m-auto p-2 before:block before:absolute before:-skew-x-12 before:-inset-1 before:bg-ukraine-yellow relative"
                    >
                        <span className="relative">{ strings.landing.about.faq.title }</span>
                    </h1>
                    <div className="flex flex-col gap-4 col-span-2">
                        {
                            strings.landing.about.faq.toggles.map(
                                ({ question, answer, linkText, link }, index) => (
                                    <div
                                        key={ index }
                                        className="flex flex-col gap-4 items-middle w-full p-2 text-xl"
                                    >
                                        <span
                                            className={
                                                twMerge(
                                                    "flex flex-row gap-1 items-center font-bold cursor-pointer hover:text-ukraine-blue",
                                                    index == faqOpenIndex ? "text-ukraine-blue" : "text-oxford-blue"
                                                )
                                            }
                                            onClick={ () => setFAQOpenIndex(index == faqOpenIndex ? -1 : index)}
                                        >
                                            { question }
                                            {
                                                index == faqOpenIndex
                                                ? <ExpandLess />
                                                : <ExpandMore />
                                            }
                                        </span>
                                        <span className={ twMerge("relative text-lg leading-relaxed whitespace-pre-line text-slate-700 transition-all duration-200", faqOpenIndex == index ? "block" : "hidden") }>
                                            { answer }
                                            {
                                                link ? 
                                                (
                                                    <>
                                                        <div className="mt-1" />
                                                        <Link href={ link } className="underline italic hover:text-ukraine-blue" target="_blank">
                                                            { linkText }
                                                        </Link>
                                                    </>
                                                ) : (<></>)
                                            }
                                            
                                        </span>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>

            {/* ROADMAP SECTION */}
            <div className="flex flex-col w-full justify-center justify-items-center items-align-middle p-8 md:p-16 gap-8 md:gap-0">
                <h1
                    className="flex text-3xl md:text-5xl font-bold text-center m-auto p-2 before:block before:absolute before:-skew-x-12 before:-inset-1 before:bg-ukraine-yellow relative"
                >
                    <span className="relative">{ strings.landing.about.roadmap.title }</span>
                </h1>
                <div className="col-span-2 w-full h-full relative hidden md:flex -mb-32 -mt-16">
                    <ImageWithFallback src={ roadmapHorizontal.src } width={8000} height={8000} alt="Roadmap" sizes="100vw" />
                </div>
                <div className="col-span-2 w-full h-full relative flex md:hidden">
                    <ImageWithFallback src={ roadmapVertical.src } width={8000} height={8000} alt="Roadmap" sizes="100vw" />
                </div>
            </div>

            {/* WANT TO WORK WITH US SECTION */}
            <div className="flex flex-col w-full p-8 md:p-16 gap-8 justify-center justify-items-center items-align-middle bg-alice-blue">
                <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-32">
                    <h1
                        className="flex text-3xl md:text-5xl font-bold text-center m-auto p-2 before:block before:absolute before:-skew-x-12 before:-inset-1 before:bg-ukraine-yellow relative"
                    >
                        <span className="relative">{ strings.landing.about.wantToWorkWithUs.title }</span>
                    </h1>
                    <div className="text-lg md:text-xl text-slate-700 leading-loose col-span-2">
                        { strings.landing.about.wantToWorkWithUs.text1 }&nbsp;
                        <Link href="#" className="underline hover:text-ukraine-blue" target="_blank">
                            { strings.landing.about.wantToWorkWithUs.openPositionsLinkText }
                        </Link>
                        { strings.landing.about.wantToWorkWithUs.text2 }&nbsp;
                        <Link href={ INFO.emailLink } className="underline hover:text-ukraine-blue">
                            { INFO.email }
                        </Link>
                        &nbsp;{ strings.landing.about.wantToWorkWithUs.text3 }
                        <div className="mt-4" />
                        { strings.landing.about.wantToWorkWithUs.text4 }
                    </div>
                </div>
            </div>

            {/* TEAM MEMBERS SECTION */}
            <div className="flex flex-col w-full p-8 md:p-16 justify-center justify-items-center gap-16 bg-white">
                <text className="text-5xl font-bold mx-auto text-center px-4 py-2 before:block before:absolute before:-skew-x-12 before:-inset-1 before:bg-ukraine-yellow relative inline-block"><span className="text-black relative">{ strings.landing.about.teamSectionTitle }</span></text>
                <div className="mx-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 justify-items-center items-start gap-16">
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
