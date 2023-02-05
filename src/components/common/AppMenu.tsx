import { FullScreenPanelPosition, PanelState } from "@appTypes/businesses"
import { SetStateAction } from "jotai"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import Image from 'next/image'
import { links as sections } from "@utils/config"
import Logo from '@public/images/logo.png'
import FullScreenPanel from "@components/common/FullScreenPanel"
import { useState } from "react"
import FeedbackPanel from "@components/business/FeedbackPanel"
import strings from "@utils/strings"

type Props = {
    className?: string,
    menuState: PanelState,
    setMenuState: (update: SetStateAction<PanelState>) => void
}

/**
 * The sidebar menu component to display in the app layouts.
 */
 export function AppMenu({ className, menuState, setMenuState }: Props) {

    const [ feedbackPanelState, setFeedbackPanelState ] = useState<PanelState>(PanelState.Closed)

    const title = (
        <div className="grid grid-cols-2 md:grid-cols-3 w-full items-center">
            <div className="flex items-center md:col-span-2 max-w-xs">
                <Link href="/">
                    <Image
                        src={ Logo }
                        className="object-contain object-left"
                        alt="Logo"
                    />
                </Link>
            </div>
            <span className="col-span-1"></span>
        </div>
    )

    return (
        <>
            <FullScreenPanel
                panelState={ menuState }
                closePanel={ () => setMenuState(PanelState.Closed) }
                position={ FullScreenPanelPosition.Left }
                title={ title }
                className={
                    // flex overrides "hidden", instead hiding it by movement, thus enabling transitions
                    twMerge(
                        "transition-all flex md:max-w-xs w-screen h-screen overflow-auto gap-16 md:gap-8 p-8 justify-center md:justify-start md:rounded-none text-center md:text-start",
                        menuState === PanelState.Closed ? "hidden md:flex md:-left-full" : "",
                        className
                    )
                }
            >
                <hr />
                <div className="flex flex-col gap-16 md:gap-8">
                    {
                        sections.map(
                            ({ name, links }) => (
                                <div key={ name } className="flex flex-col gap-4">
                                    <text className="font-bold text-2xl md:text-xl">{ name }</text>
                                    <div className="flex flex-col gap-3">
                                        {
                                            links.map(
                                                ({ text, link }) => (
                                                    <text key={ link } className="text-xl md:text-base cursor-pointer text-gray-700 hover:text-ukraine-blue">
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
                {/* GIVE FEEDBACK SECTION */}
                <hr />
                <span className="flex italic mx-auto md:ml-0 cursor-pointer underline text-slate-400 text-base hover:text-ukraine-blue" onClick={ () => setFeedbackPanelState(PanelState.Open) }>
                    { strings.all.giveFeedback.full }
                </span>
            </FullScreenPanel>
            <FeedbackPanel
                panelState={ feedbackPanelState }
                closePanel={ () => setFeedbackPanelState(PanelState.Closed)}
            />
        </>
    )
}
