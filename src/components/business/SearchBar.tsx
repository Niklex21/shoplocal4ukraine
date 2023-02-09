import { IconButton, Tooltip } from "@mui/material"
import { createRef, useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Search as IconSearch, Clear as IconClear, Search as IconBusiness } from "@mui/icons-material"
import strings from "@utils/strings"
import { useAtom } from "jotai"
import { atomSearchQuery } from "src/atoms/businesses"

type Props = {
    className?: string
}

export default function SearchBar({ className }: Props) {

    const [ showAutoComplete, setShowAutoComplete ] = useState<boolean>(false)
    const [ searchQuery, setSearchQuery ] = useAtom(atomSearchQuery)
    const [ currentQuery, setCurrentQuery ] = useState<string>("")
    // stores the currently hovered state with arrow keys or mouse
    const [ currentHover, setCurrentHover ] = useState<number | null>(null)

    const inputRef = useRef<HTMLInputElement | null>(null)

    const [ autoCompleteOptions, setAutoCompleteOptions ] = useState([
        { text: "Option 1", icon: (<IconBusiness />) },
        { text: "Option 2", icon: (<IconBusiness />)  },
        { text: "Option 1", icon: (<IconBusiness />)  },
        { text: "Option 2", icon: (<IconBusiness />)  },
        { text: "Option 1", icon: (<IconBusiness />)  }
    ])

    useEffect(() => {
        if (currentQuery == "") setSearchQuery(currentQuery)
    }, [ currentQuery, setSearchQuery ])

    // reset whenever autoComplete is reset
    useEffect(() => {
        setCurrentHover(null)
    }, [ showAutoComplete, setCurrentHover, autoCompleteOptions ])

    /**
     * Updates the current hover counter by the value provided.
     * 
     * @param value should usually be +1 if the counter should be increased (going down) or -1 (if we are going up)
     */
    const updateCurrentHoverHandler = (value: number) => {
        // need to start from -1 if we are going up from null
        let hover = currentHover ?? (value === 1 ? -1 : 0)

        let n = autoCompleteOptions.length
        // this weird formula is so we rotate properly
        // this formula takes a modulo, rather than the remainder (%)
        setCurrentHover((((hover + value) % n ) + n) % n)
    }

    const autoComplete = (
        <div className={ twMerge("relative bg-white py-2 rounded-b-lg", showAutoComplete ? "flex flex-col" : "hidden") }>
            {
                autoCompleteOptions.map(
                    ({ text, icon }, index) => (
                        <span
                            className={
                                twMerge(
                                    "flex gap-4 flex-row items-align-middle px-6 py-2 cursor-pointer text-slate-600 text-base",
                                    index == currentHover ? "bg-slate-100" : "bg-white"
                                )
                            }
                            key={ index }
                            onMouseEnter={ () => setCurrentHover(index) }
                        >
                            <span className="flex my-auto text-slate-400">{ icon }</span>
                            { text }
                        </span>
                    )
                )
            }
        </div>
    )

    return (
        <div className={ twMerge("flex w-auto shrink grow flex-col drop-shadow-md divide-y-2 divide-slate-50 divide-solid", className) }>
            <div className={ twMerge("flex flex-row gap-1 px-2 py-1 bg-white", showAutoComplete ? "rounded-t-lg" : "rounded-lg") }>
                <input
                    className="px-4 py-2 w-64 grow shrink focus:outline-none  bg-white"
                    onFocus={() => setShowAutoComplete(true)}
                    onBlur={ () => setShowAutoComplete(false)}
                    placeholder={ strings.businesses.businessView.searchBar.placeholder }
                    value={ currentQuery }
                    onChange={ (e) => setCurrentQuery(e.currentTarget.value) }
                    onKeyDown={ (ke) => {
                        // has to be flipped, because we are indexing top-to-bottom
                        if (ke.key === "ArrowDown") { ke.preventDefault(); updateCurrentHoverHandler(1) }
                        else if (ke.key === "ArrowUp") { ke.preventDefault(); updateCurrentHoverHandler(-1) }
                    }}
                    onMouseEnter={() => setCurrentHover(null)}
                    ref={ inputRef }
                />
                <Tooltip title={ strings.businesses.businessView.searchBar.tooltipSearchIcon }>
                    <IconButton
                        onClick={ () => {
                            currentQuery === ""
                            ? inputRef.current!.focus()
                            : setSearchQuery(currentQuery)
                        }}
                        className="flex my-auto hover:text-ukraine-blue"
                    >
                        <IconSearch />
                    </IconButton>
                </Tooltip>
                <Tooltip title={ strings.businesses.businessView.searchBar.tooltipClearIcon }>
                    <IconButton disabled={ currentQuery === "" } onClick={ () => setCurrentQuery("") } className="flex my-auto hover:text-ukraine-blue">
                        <IconClear />
                    </IconButton>
                </Tooltip>
            </div>
            { autoComplete }
        </div>
    )
}