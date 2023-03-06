import { IconButton } from "@mui/material"
import { twMerge } from "tailwind-merge"
import { Menu as IconMenu, Feedback as IconFeedback, AddBusiness as IconAdd } from "@mui/icons-material"
import { PanelState } from "@appTypes/businesses"
import { AppMenu } from "@components/common/AppMenu"
import { useEffect, useState } from "react"
import FeedbackPanel from "@components/business/FeedbackPanel"
import Link from "next/link"
import strings from "@utils/strings"

type Props = {
    className?: string
}

export default function MobileMenu({ className }: Props) {

    const [ menuState, setMenuState ] = useState<PanelState>(PanelState.Closed)
    const [ feedbackPanelState, setFeedbackPanelState ] = useState<PanelState>(PanelState.Closed)

    return (
        <>
            <div className={ twMerge("flex transition-all duration-200 fixed bottom-0 left-0 w-full h-20 bg-white dark:bg-oxford-blue gap-8 z-40 drop-shadow-t-md dark:drop-shadow-t-white-md justify-center text-oxford-blue dark:text-white overflow-visible", className) }>
                <IconButton className="flex flex-col gap-1 my-auto" onClick={ () => setMenuState(PanelState.Open) }>
                    <IconMenu className="text-slate-600 dark:text-slate-200 text-2xl" />
                    <span className="text-slate-700 dark:text-slate-300 text-xs">{ strings.app.mobileMenu.menu }</span>
                </IconButton>
                <Link href="/join" target="_blank" className="my-auto">
                    <IconButton className="flex flex-col gap-1 my-auto">
                        <IconAdd className="text-slate-400 dark:text-slate-300 text-2xl" />
                        <span className="text-slate-500 dark:text-slate-400 text-xs">{ strings.app.mobileMenu.add }</span>
                    </IconButton>
                </Link>
                <IconButton className="flex flex-col gap-1 my-auto" onClick={ () => setFeedbackPanelState(PanelState.Open) }>
                    <IconFeedback className="text-slate-400 dark:text-slate-300 text-2xl" />
                    <span className="text-slate-500 dark:text-slate-400 text-xs">{ strings.app.mobileMenu.feedback }</span>
                </IconButton>
            </div>
            <AppMenu menuState={ menuState } setMenuState={ setMenuState } />
            <FeedbackPanel panelState={ feedbackPanelState } closePanel={ () => setFeedbackPanelState(PanelState.Closed)} />
        </>
    )
}
