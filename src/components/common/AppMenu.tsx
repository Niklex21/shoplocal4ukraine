import { FullScreenPanelPosition, PanelState } from "@appTypes/businesses"
import { SetStateAction } from "jotai"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import { links as sections, socials } from "@utils/config"
import Logo from '@public/images/logo.png'
import smallLogo from "@public/images/logoNoText.png"
import FullScreenPanel from "@components/common/FullScreenPanel"
import { createElement, useState } from "react"
import FeedbackPanel from "@components/business/FeedbackPanel"
import strings from "@utils/strings"
import ImageWithFallback from "./ImageWithFallback"
import { isMobile } from "react-device-detect"

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
        <div className="flex flex-row md:grid md:grid-cols-3 w-full items-center">
            <div className="flex items-center md:col-span-2 max-w-xs">
                <Link href="/">
                    <ImageWithFallback
                        src={ isMobile ? smallLogo : Logo }
                        className="object-contain object-left w-12 h-12 my-auto md:w-full md:h-full"
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
                        "transition-all flex md:max-w-xs gap-8 p-8 justify-center md:justify-start md:rounded-none text-center md:text-start",
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
                                    <text className="font-bold text-lg md:text-xl">{ name }</text>
                                    <div className="flex flex-col gap-3">
                                        {
                                            links.map(
                                                ({ text, link }) => (
                                                    <text key={ link } className="text-base cursor-pointer text-gray-700 dark:text-slate-200 hover:text-ukraine-blue dark:hover:text-ukraine-yellow">
                                                        <Link href={ link } onClick={ () => setMenuState(PanelState.Closed)}>
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
                <hr />
                <div className="flex flex-col gap-4">
                    <text className="font-bold text-lg md:text-xl">{ strings.landing.footer.sections.socials.name }</text>
                    {
                        socials.map(
                            ({ iconSVG, link, text, }, index: number) => (
                                <Link href={ link ?? "" } target="_blank" key={ index } onClick={ () => setMenuState(PanelState.Closed)}>
                                    <span className="flex flex-row justify-center md:justify-start gap-2 text-base cursor-pointer text-gray-700 dark:text-slate-200 hover:text-ukraine-blue dark:hover:text-ukraine-yellow">
                                        { createElement(iconSVG!, { className: "text-xl md:text-2xl my-auto" }) }
                                        { text }
                                    </span>
                                </Link>
                            )
                        )
                    }
                </div>
                {/* GIVE FEEDBACK SECTION */}
                <hr />
                {/* <div className="flex flex-col gap-4"> */}
                    {/* DARK MODE */}
                    {/* <span className="flex md:mb-0 mx-auto md:ml-0 font-bold text-lg md:text-xl">
                        { strings.app.darkMode.scheme }
                    </span>
                    <DarkModeSwitch className="mx-auto md:ml-0" /> */}
                {/* </div> */}
                <span className="flex md:mb-0 italic mx-auto md:ml-0 cursor-pointer underline text-slate-400 text-base hover:text-ukraine-blue dark:hover:text-ukraine-yellow" onClick={ () => setFeedbackPanelState(PanelState.Open) }>
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
