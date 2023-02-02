import { ArrowForward, ArrowRightAlt } from "@mui/icons-material"
import { twMerge } from "tailwind-merge"
import { _Button } from "./_Button"

export function ButtonSecondary({ text, className = "" }: { text: string, className?: string }) {
    return _Button(twMerge("bg-ukraine-blue text-white gap-1 font-bold", className), text, (<ArrowForward className={ className } />))
}
