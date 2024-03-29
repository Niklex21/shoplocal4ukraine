import { Person } from "@appTypes/landing";
import Image from 'next/image'

import { Email as IconEmail, Language as IconWebsite, LinkedIn as IconLinkedin, Instagram as IconInstagram, GitHub as IconGitHub, Facebook as IconFacebook } from "@mui/icons-material"
import Link from "next/link";
import { useState } from "react";
import { AiFillBehanceCircle as IconBehance } from "react-icons/ai"
import { IconLinkText } from "@appTypes/businesses";
import { IconButton, Tooltip } from "@mui/material";
import strings from "@utils/strings"
import ImageWithFallback from "@components/common/ImageWithFallback";

export function PersonCard({ name, profilePictureURL, role, description, gifURL, website, email, linkedin, instagram, behance, github, facebook } : Person) {

    let socials : Array<IconLinkText> = []

    if (website) socials.push({
        icon: (
            <IconWebsite fontSize="inherit" />
        ),
        link: website,
        text: strings.landing.about.socials.website
    })

    if (email) socials.push({
        icon: (
            <IconEmail fontSize="inherit" />
        ),
        link: "mailto:" + email,
        text: strings.landing.about.socials.email
    })

    if (linkedin) socials.push({
        icon: (
            <IconLinkedin fontSize="inherit" />
        ),
        link: linkedin,
        text: strings.landing.about.socials.linkedin
    })

    if (instagram) socials.push({
        icon: (
            <IconInstagram />
        ),
        link: instagram,
        text: strings.landing.about.socials.instagram
    })

    if (behance) socials.push({
        icon: (
            <IconBehance />
        ),
        link: behance,
        text: strings.landing.about.socials.behance
    })

    if (github) socials.push({
        icon: (
            <IconGitHub />
        ),
        link: github,
        text: strings.landing.about.socials.github
    })

    if (facebook) socials.push({
        icon: (
            <IconFacebook />
        ),
        link: facebook,
        text: strings.landing.about.socials.facebook
    })

    const [ currentImageURL, setCurrentImageURL ] = useState<string>(profilePictureURL)

    const toggleImageURL = () => {
        if (gifURL === "") return

        setCurrentImageURL( currentImageURL === gifURL ? profilePictureURL : gifURL)
    }

    return (
        <div className="flex flex-col justify-center text-oxford-blue">
            <div className="flex justify-center w-64 h-64 relative mx-auto">
                <Image
                    src={ currentImageURL }
                    alt="Profile Picture"
                    className="object-cover rounded-full"
                    fill={ true }
                    onMouseOver={ () => setCurrentImageURL(gifURL === "" ? profilePictureURL : gifURL) }
                    onMouseOut={ () => setCurrentImageURL(profilePictureURL) }
                    onClick={ () => toggleImageURL() }
                />
            </div>
            <text className="text-center text-2xl mt-4 font-bold">{ name }</text>
            <text className="text-center text-xl mt-2 text-ukraine-blue">{ role }</text>
            <text className="text-center text-lg mt-2 max-w-xs text-slate-700">{ description }</text>
            <div className="mt-2 flex w-full justify-center flex-row gap-1">
                {
                    socials.map(
                        ({ icon, link, text }, index: number) => (
                            <div key={ index } className="text-3xl">
                                <Link href={ link ?? "" } target="_blank">
                                    <Tooltip title={ text ?? "" }>
                                        <IconButton className="hover:text-ukraine-blue">
                                            { icon }
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
