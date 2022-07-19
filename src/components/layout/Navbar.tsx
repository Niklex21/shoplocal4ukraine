import Image from 'next/image'
import logo from '@public/logo.svg'
import Link from 'next/link'
import { ReactElement } from 'react'

interface LinkType {
    name: string,
    href: string 
}

// A list of pages and links to render in the navbar
const navLinks : Array<LinkType> = [
    {
        name: 'Businesses',
        href: '/businesses'
    },
    {
        name: 'About',
        href: '/about'
    },
    {
        name: 'Privacy',
        href: '/privacy'
    },
    {
        name: 'Contact',
        href: '/contact'
    }
]

export default function Navbar() {

    const links : ReactElement[] = navLinks.map(({ name, href } : LinkType) => (
        <Link key={name} href={href}>
            <a className="text-lg font-medium text-text opacity-70 hover:opacity-100">{ name }</a>
        </Link>
    ))

    return (
        <div className="flex w-full items-stretch justify-between p-4 max-h-24 drop-shadow-md top-0 left-0 sticky bg-white">
            <div>
                <Link href="/">
                    {
                        //TODO: change this into an actual image -- images in next barely work
                    }
                    <a className="text-lg font-medium text-text opacity-70 hover:opacity-100">Logo</a>
                </Link>
            </div>
            <div className="flex space-x-8">
                <div className="space-x-8">
                    { links }
                </div>
                <div className="">
                    <Link href="/join">
                        <a className="text-lg font-medium px-3 py-2 rounded-md opacity-70 hover:opacity-100 bg-sky-800 text-white">
                            Add a business
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}