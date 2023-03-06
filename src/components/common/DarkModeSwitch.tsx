import { DarkModeOptions } from "@appTypes/common"
import { SwitchUnstyled } from "@mui/base"
import { BrightnessAuto, BrightnessAutoOutlined, Contrast, DarkMode, LightMode } from "@mui/icons-material"
import { Tooltip } from "@mui/material"
import strings_en from "@utils/strings"
import { useAtom } from "jotai"
import { createElement } from "react"
import { atomDarkMode } from "src/atoms/global"
import { twMerge } from "tailwind-merge"

type Props = {
    className?: string
}

export default function DarkModeSwitch({ className }: Props) {

    const [ darkMode, setDarkMode ] = useAtom(atomDarkMode)

    const trackStyling : string = {
        [DarkModeOptions.Light]: "bg-yellow-200",
        [DarkModeOptions.System]: "bg-blue-200",
        [DarkModeOptions.Dark]: "bg-white"
    }[darkMode]

    const thumbStyling : string = {
        [DarkModeOptions.Light]: "translate-x-0 left-1 bg-ukraine-yellow",
        [DarkModeOptions.System]: "-translate-x-1/2 left-1/2 bg-ukraine-blue",
        [DarkModeOptions.Dark]: "-translate-x-full left-[calc(100%-0.25rem)] bg-oxford-blue"
    }[darkMode]

    const icon = {
        [DarkModeOptions.Light]: (
            <LightMode className="text-oxford-blue relative flex w-full h-full" />
        ),
        [DarkModeOptions.System]: (
            <Contrast className="text-white relative flex w-full h-full" />
        ),
        [DarkModeOptions.Dark]:  (
            <DarkMode className="text-white relative flex w-full h-full" />
        ),
    }[darkMode]

    const iconStyling : string = {
        [DarkModeOptions.Light]: "translate-x-0 left-1 bg-yellow-300",
        [DarkModeOptions.System]: "-translate-x-1/2 left-1/2 bg-blue-300",
        [DarkModeOptions.Dark]: "-translate-x-full left-[calc(100%-0.25rem)] bg-blue-900"
    }[darkMode]

    const nextMode = () => {
        let map : { [key in DarkModeOptions]: DarkModeOptions } = {
            [DarkModeOptions.Light]: DarkModeOptions.System,
            [DarkModeOptions.System]: DarkModeOptions.Dark,
            [DarkModeOptions.Dark]: DarkModeOptions.Light
        }

        setDarkMode(map[darkMode])
    }

    return (
        <Tooltip title={ strings_en.app.darkMode.tooltips[darkMode] }>
            <div
                className={ twMerge("relative flex cursor-pointer transition-all duration-100 h-8 w-24 rounded-full", trackStyling, className) }
                onClick={ nextMode }
            >
                <div className={ twMerge("transition-all duration-100 absolute w-6 top-1 h-6 p-1 rounded-full bg-white flex", thumbStyling) }>
                    { icon }
                </div>
            </div>
        </Tooltip>
    )
}