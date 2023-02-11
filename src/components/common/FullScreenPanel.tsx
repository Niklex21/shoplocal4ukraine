import { FullScreenPanelPosition, PanelState } from "@appTypes/businesses"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"
import { Close as IconClose } from "@mui/icons-material"
import { IconButton } from "@mui/material"

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
                return "left-0 top-0 h-screen md:w-auto"
            case FullScreenPanelPosition.Right:
                return "right-0 top-0 md:w-auto h-screen"
            case FullScreenPanelPosition.Top:
                return "left-0 top-0 md:h-auto w-screen"
            case FullScreenPanelPosition.Bottom:
                return "left-0 bottom-0 md:h-auto w-screen"
            case FullScreenPanelPosition.Center:
            default:
                return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen md:w-auto md:h-auto"
        }
    })()

    return (
        <>
            <div
                className={
                    twMerge(
                        "fixed top-0 left-0 w-screen h-screen z-50 bg-black opacity-20",
                        panelState === PanelState.Closed ? "hidden" : ""
                    )
                }
                onClick={ closePanel }
            />
            <div
                className={
                    twMerge(
                        `rounded-none md:rounded-lg z-50 fixed flex flex-col gap-4 bg-white p-6 justify-center overflow-auto max-w-full md:max-h-full w-full h-full ${ positionStyles } `,
                        panelState === PanelState.Closed ? "hidden" : "",
                        className
                    )
                }
            >
                <div className="flex flex-row justify-between gap-8 text-lg items-center relative md:p-0 w-full">
                    <span className="font-bold">{ title }</span>
                    <IconButton
                        aria-label="open sharing panel"
                        onClick={ closePanel }
                    >
                        <IconClose className="text-4xl md:text-3xl" />
                    </IconButton>
                </div>
                { children }
            </div>
        </>
    )
}
