import { FullScreenPanelPosition, PanelState } from "@appTypes/businesses"
import { ReactNode, useEffect, useRef } from "react"
import { twMerge } from "tailwind-merge"
import { Close as IconClose } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { isMobile } from "react-device-detect"

type Props = {
    className?: string,
    panelState: PanelState,
    closePanel: () => void,
    children?: ReactNode,
    position?: FullScreenPanelPosition,
    title?: ReactNode
}

// can't be <></> because it still needs to be recorded by the tree for the closure element alignment
const defaultTitle = (
    <span></span>
)

/**
 * A generic full-screen panel that dims everything on the background and some data on top (at the location of choice).
 * @props className the optional styles to append to the panel
 * @props panelState a variable that defines the current state (open/closed) of the panel
 * @props closePanel a callback function to change the state of the panel to Closed
 * @props title a {@link ReactNode} to display in the top-left of the component (most times -- a string title)
 */
export default function FullScreenPanel({ className, panelState, closePanel, children, position , title = defaultTitle }: Props) {

    const positionStyles = (() => {
        switch (position) {
            case FullScreenPanelPosition.Left:
                return "left-0 top-0 h-full md:w-auto"
            case FullScreenPanelPosition.Right:
                return "right-0 top-0 md:w-auto h-full"
            case FullScreenPanelPosition.Top:
                return "left-0 top-0 md:h-auto w-full"
            case FullScreenPanelPosition.Bottom:
                return "left-0 bottom-0 md:h-auto w-full"
            case FullScreenPanelPosition.Center:
            default:
                return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full md:w-auto md:h-auto"
        }
    })()

    const hiddenInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (hiddenInputRef && hiddenInputRef.current) hiddenInputRef.current.focus()
    })

    return (
        <>
            {
                !isMobile
                && (
                    <div
                        className={
                            twMerge(
                                "fixed top-0 left-0 w-full h-full z-50 bg-black opacity-20",
                                panelState === PanelState.Closed ? "hidden" : ""
                            )
                        }
                        onClick={ closePanel }
                    />
                )
            }
            <div
                className={
                    twMerge(
                        "rounded-none md:rounded-lg z-50 absolute flex flex-col gap-4 bg-white dark:bg-oxford-blue text-oxford-blue dark:text-white p-6 justify-center overflow-auto max-w-full md:max-h-full w-full h-full",
                        positionStyles,
                        panelState === PanelState.Closed ? "hidden" : "",
                        className
                    )
                }
                onKeyDown={
                    (ke) => {
                        if (ke.key === "Escape") closePanel()
                    }
                } 
            >
                {/* need this hidden input so that the whole thing can autofocus, and when the escape character is pressed, the panel closes */}
                <input
                    autoFocus
                    ref={ hiddenInputRef }
                    className="w-0 h-0 hidden md:flex"
                />
                <div className="flex flex-row justify-between gap-8 text-lg items-center relative md:p-0 w-full mt-16 md:mt-0">
                    <span className="font-bold dark:text-white">{ title }</span>
                    <IconButton
                        aria-label="open sharing panel"
                        onClick={ closePanel }
                    >
                        <IconClose className="text-4xl md:text-3xl dark:text-white" />
                    </IconButton>
                </div>
                { children }
                {/* needed because otherwise the menu is rendering weirdly */}
                <span className="flex md:hidden">&nbsp;</span>
            </div>
        </>
    )
}
