import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export function _Button(className: string, text: string, icon: ReactNode = (<></>)) {
    return (
        <button className={ twMerge("flex px-6 py-3 hover:bg-ukraine-yellow hover:text-black rounded-full hover:drop-shadow-button text-center items-center", className) }>
            { text }
            { icon }
        </button>
    )
}
