import { Person } from "@appTypes/landing";
import Image from 'next/image'

import { Email as IconEmail, Language as IconWebsite, LinkedIn as IconLinkedin, SvgIconComponent } from "@mui/icons-material"
import Link from "next/link";
import { useState } from "react";

type Social = {
    icon: JSX.Element,
    link: string
}

export function PersonCard({ name, profilePictureURL, role, description, gifURL, website, email, linkedin } : Person) {

    let socials : Array<Social> = []

    if (website) socials.push({
        icon: (
            <IconWebsite fontSize="inherit" />
        ),
        link: website
    })

    if (email) socials.push({
        icon: (
            <IconEmail fontSize="inherit" />
        ),
        link: "mailto:" + email
    })

    if (linkedin) socials.push({
        icon: (
            <IconLinkedin fontSize="inherit" />
        ),
        link: linkedin
    })

    const [ currentImageURL, setCurrentImageURL ] = useState<string>(profilePictureURL)

    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-center">
                <Image
                    src={ currentImageURL }
                    alt="Profile Picture"
                    className="object-contain rounded-full"
                    width={ "256px" }
                    height={ "256px" }
                    onMouseOver={ () => setCurrentImageURL(gifURL) }
                    onMouseOut={ () => setCurrentImageURL(profilePictureURL) }
                />
            </div>
            <text className="text-center text-2xl mt-4 font-bold">{ name }</text>
            <text className="text-center text-xl mt-2 text-ukraine-blue">{ role }</text>
            <text className="text-center text-lg mt-2 max-w-xs text-gray-600">{ description }</text>
            <div className="mt-2 flex w-full justify-center flex-row gap-2">
                {
                    socials.map(
                        ({ icon, link }, index: number) => (
                            <div key={ index } className="cursor-pointer hover:text-ukraine-blue text-3xl">
                                <Link href={ link }>
                                    { icon }
                                </Link>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
