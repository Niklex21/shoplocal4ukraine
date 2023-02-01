import { ArrowRightAlt } from "@mui/icons-material"
import { _Button } from "./_Button"

export function ButtonSecondary({ text }: { text: string }) {
    return _Button("bg-ukraine-blue text-white gap-1 py-3", text, (<ArrowRightAlt />))
}
