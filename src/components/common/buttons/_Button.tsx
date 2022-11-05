import { twMerge } from "tailwind-merge"

export function _Button(className: string, text: string) {
    return (
        <button className={ twMerge("px-4 py-2 hover:bg-ukraine-yellow hover:text-black rounded-full hover:drop-shadow-button", className) }>
            { text }
        </button>
    )
}
