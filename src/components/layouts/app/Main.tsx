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
import { Tooltip } from '@mui/material'
import { PanelState } from '@appTypes/businesses'

type Props = {
    children?: ReactNode
}

const menuStateAtom = atom<PanelState>(PanelState.Closed)

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
                <div className="flex absolute top-2 left-2 z-50 p-2.5 bg-slate-50 cursor-pointer rounded-lg drop-shadow-md hover:bg-slate-100">
                    <Tooltip title={ strings.app.tooltipMenuButton }>
                        <IconMenu
                            className={
                                "text-gray-800 text-3xl z-50 cursor-pointer " +
                                (menuState === PanelState.Closed ? "" : "z-0")
                            }
                            onClick={ () => setMenuState(PanelState.Open) }
                        />
                    </Tooltip>
                </div>
                <div
                    className={
                        "absolute top-0 h-full w-full left-0 bg-black transition-opacity duration-500 " +
                        (menuState === PanelState.Closed ? "opacity-0 -z-50" : "opacity-20 z-50")
                    }
                    onClick={ () => setMenuState(PanelState.Closed) }
                />
                <AppMenu
                    className={
                        "transition-all " +
                        (menuState === PanelState.Closed ? "-left-full" : "left-0")
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
                    onClick={ () => setMenuState(PanelState.Closed) }
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
