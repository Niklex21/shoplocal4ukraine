import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export function _Button(className: string, text: string, icon: ReactNode = (<></>)) {
    return (
        <button className={ twMerge("flex px-4 py-2 hover:bg-ukraine-yellow hover:text-black rounded-full hover:drop-shadow-button", className) }>
            { icon }
            { text }
        </button>
    )
}
