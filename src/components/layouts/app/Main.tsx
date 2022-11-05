import { ReactNode } from 'react'

import Head from 'next/head'
import favicon from '@public/images/favicon.png'
import strings from '@utils/strings'
import { atom, useAtom } from "jotai"
import Link from "next/link"
import Image from "next/image"
import Logo from '@public/images/logo.png'
import { twMerge } from "tailwind-merge"
import { Menu as IconMenu, Close as IconClose } from "@mui/icons-material"
import { links as sections } from "@utils/config"

interface Props {
    children?: ReactNode
}

enum MenuState {
    Closed,
    Open
}

const menuStateAtom = atom(MenuState.Closed)

export default function AppMainLayout({ children }: Props) {

    const [ menuState, setMenuState ] = useAtom(menuStateAtom)

    return (
        <>
            <Head>
                <link rel="shortcut icon" href={ favicon.src } />
                <title key="title">{ strings.all.title }</title>
            </Head>
            <div className="h-screen w-screen p-0 m-0 bg-slate-50 max-h-screen flex">
                { children }
                <IconMenu 
                    className={
                        "text-gray-700 hover:text-black absolute top-3 left-2 text-5xl z-50 cursor-pointer border-4 bg-slate-50 border-slate-50 rounded-sm " +
                        (menuState === MenuState.Closed ? "" : "z-0")
                    }
                    onClick={ () => setMenuState(MenuState.Open) } 
                />
                <div 
                    className={
                        "absolute top-0 h-full w-full left-0 bg-black transition-opacity duration-500 " +
                        (menuState === MenuState.Closed ? "opacity-0 -z-50" : "opacity-20 z-50")
                    }
                    onClick={ () => setMenuState(MenuState.Closed) }
                />
                <AppMenu 
                    className={ 
                        "transition-all " +
                        (menuState === MenuState.Closed ? "-left-full" : "left-0")
                    } 
                />
            </div>
        </>
    )
}

/**
 * The sidebar menu component to display in the app layouts.
 */
 export function AppMenu({ className }: { className: string }) {

    const [, setMenuState ] = useAtom(menuStateAtom)

    return (
        <div className={ twMerge("flex flex-col absolute top-0 h-full bg-slate-50 gap-8 p-8 z-50 max-w-xs overflow-auto", className) }>
            <div className="grid grid-cols-2 justify-items-end">
                <Image
                    src={ Logo }
                    className="object-contain object-left max-w-xs"
                    alt="Logo"
                />
                <IconClose
                    className="text-gray-700 hover:text-black text-5xl cursor-pointer"
                    onClick={ () => setMenuState(MenuState.Closed) }
                />
            </div>
            <hr />
            <div className="flex flex-col gap-8">
                {
                    sections.map(
                        ({ name, links }) => (
                            <div key={ name } className="flex flex-col gap-4">
                                <text className="font-bold text-xl">{ name }</text>
                                <div className="flex flex-col gap-3">
                                    {
                                    links.map(
                                        ({ text, link }) => (
                                        <text key={ link } className="text-base cursor-pointer text-gray-700 hover:text-ukraine-blue">
                                            <Link href={ link }>
                                                { text }
                                            </Link>
                                        </text>
                                        )
                                    )
                                    }
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
