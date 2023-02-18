import { IconButton } from "@mui/material"
import { twMerge } from "tailwind-merge"
import { Menu as IconMenu, Feedback as IconFeedback, Add as IconAdd } from "@mui/icons-material"
import { PanelState } from "@appTypes/businesses"
import { AppMenu } from "@components/common/AppMenu"
import { useState } from "react"
import FeedbackPanel from "@components/business/FeedbackPanel"
import Link from "next/link"

type Props = {
    className?: string
}

export default function MobileMenu({ className }: Props) {

    const [ menuState, setMenuState ] = useState<PanelState>(PanelState.Closed)
    const [ feedbackPanelState, setFeedbackPanelState ] = useState<PanelState>(PanelState.Closed)

    return (
        <>
            <div className={ twMerge("flex fixed bottom-0 left-0 w-full h-20 bg-white gap-8 z-40 justify-center text-oxford-blue overflow-visible", className) }>
                <IconButton className=" my-auto p-3" onClick={ () => setMenuState(PanelState.Open) }>
                    <IconMenu className="text-oxford-blue"/>
                </IconButton>
                <Link href="/join" target="_blank" className="my-auto">
                    <IconButton className="bg-ukraine-blue rounded-full my-auto focus:bg-ukraine-blue">
                        <IconAdd className="text-white text-4xl" />
                    </IconButton>
                </Link>
                <IconButton className="my-auto p-3" onClick={ () => setFeedbackPanelState(PanelState.Open) }>
                    <IconFeedback className="text-oxford-blue" />
                </IconButton>
            </div>
            <AppMenu menuState={ menuState } setMenuState={ setMenuState } />
            <FeedbackPanel panelState={ feedbackPanelState } closePanel={ () => setFeedbackPanelState(PanelState.Closed)} />
        </>
    )
}