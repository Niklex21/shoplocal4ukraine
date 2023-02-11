import { IconButton, SvgIcon, Tooltip } from "@mui/material"
import { createElement, createRef, ReactNode, useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Search as IconSearch, Clear as IconClear, Search as IconBusiness, Add } from "@mui/icons-material"
import strings from "@utils/strings"
import { useAtom } from "jotai"
import { atomSearchQuery, atomCurrentQuery, atomAutocompleteSuggestions, atomSelectedBusinessID, atomSelectedCategories, atomSelectedTags } from "src/atoms/businesses"
import { getAutocompleteCategoryIcon } from "@utils/converters"
import Link from "next/link"
import { AutocompleteSuggestionCategory } from "@appTypes/businesses"

type Props = {
    className?: string
}

export default function SearchBar({ className }: Props) {

    const [ showAutoComplete, setShowAutoComplete ] = useState<boolean>(false)
    const [ searchQuery, setSearchQuery ] = useAtom(atomSearchQuery)
    const [ currentQuery, setCurrentQuery ] = useAtom(atomCurrentQuery)
    // stores the currently hovered state with arrow keys or mouse
    const [ currentHover, setCurrentHover ] = useState<number | null>(null)
    const [ autoCompleteOptions ] = useAtom(atomAutocompleteSuggestions)
    const [ , setBusinessId ] = useAtom(atomSelectedBusinessID)
    const [ selectedCategories, setSelectedCategories ] = useAtom(atomSelectedCategories)
    const [ selectedTags, setSelectedTags ] = useAtom(atomSelectedTags)
    // this is needed because blur event prevents handling onmouseup in any form
    // this way, the behaviour is natural
    const [ autoCompleteClick, setAutocompleteClick ] = useState<boolean>(false)
    
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (currentQuery === "") setSearchQuery(currentQuery)
    }, [ currentQuery, setSearchQuery ])

    // reset whenever autoComplete is reset
    useEffect(() => {
        setCurrentHover(null)
    }, [ showAutoComplete, setCurrentHover, autoCompleteOptions ])

    // whenever the autocompleteclick is changed to false, we want to hide the autocomplete (clicked on one of the options)
    useEffect(() => {
        if (!autoCompleteClick) setShowAutoComplete(false)
    }, [ autoCompleteClick ])


    // a utility function to convert a given text option to a boldened match option given the match indices
    const getBoldText = (text: string, indices: readonly [number, number][]) : ReactNode => {
        // find the biggest chunk of bold (not consecutive, but specifically as a biggest matches substring)
        let boldArea = [...indices].sort((a, b) => (b[1] - b[0]) - (a[1] - a[0]))[0]

        return text.split('').map(
            (c, index) => index >= boldArea[0] && index <= boldArea[1] ? (<span className="font-bold" key={ index }>{ c }</span>) : (<>{ c }</>)
        )
    }

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

    const triggerSelection = () => {
        // if we are not selecting anything from the options
        if (currentHover === null) {
            setSearchQuery(currentQuery)
            return
        }

        // the one we are choosing
        let option = autoCompleteOptions[currentHover]

        switch (option.category) {
            case AutocompleteSuggestionCategory.Business:
                setCurrentQuery(option.text)
                setBusinessId(option.properties?.businessId ?? "")
                return
            case AutocompleteSuggestionCategory.Category:
                setCurrentQuery(option.text + " | " + currentQuery)
                setSelectedCategories([...selectedCategories, option.properties?.categoryId ?? -1])  
                return
            case AutocompleteSuggestionCategory.Tag:
                setCurrentQuery(option.text + " | " + currentQuery)
                setSelectedTags([...selectedTags, option.properties?.tagId ?? -1])
                return 
        }
    }

    // TODO: hover effects better?
    const autoComplete = (
        <div className={ twMerge("relative bg-white py-2 rounded-b-lg", showAutoComplete ? "flex flex-col" : "hidden") }>
            {
                autoCompleteOptions.length > 0
                ? autoCompleteOptions.map(
                    ({ text, category, matches }, index) => (
                        <span
                            className={
                                twMerge(
                                    "flex gap-4 flex-row items-align-middle px-6 py-2 cursor-pointer text-slate-500 text-base",
                                    index == currentHover ? "bg-slate-100" : "bg-white"
                                )
                            }
                            key={ index }
                            onMouseEnter={ () => setCurrentHover(index) }
                            onMouseDown={ () => setAutocompleteClick(true) }
                            onMouseUp={ () => { setAutocompleteClick(false); triggerSelection(); } }
                        >
                            <span className="flex my-auto text-slate-300">{ createElement(getAutocompleteCategoryIcon(category)) }</span>
                            <span className="">{ getBoldText(text, matches ? matches[0].indices : []) }</span>
                        </span>
                    )
                )
                : (
                    <Link href="/join" target="_blank">
                        <span
                            className={
                                twMerge(
                                    "flex gap-4 flex-row items-align-middle px-6 py-2 cursor-pointer text-slate-500 text-base",
                                    0 == currentHover ? "bg-slate-100" : "bg-white"
                                )
                            }
                            onMouseEnter={ () => setCurrentHover(0) }
                            onMouseDown={ () => setAutocompleteClick(true) }
                            onMouseUp={ () => { setAutocompleteClick(false); } }
                        >
                            <span className="flex my-auto text-slate-300"><Add /></span>
                            { strings.businesses.businessView.searchBar.nothingFound }
                        </span>
                    </Link>
                )
            }
        </div>
    )

    return (
        <div
            className={ twMerge("flex w-auto shrink grow flex-col drop-shadow-md divide-y-2 divide-slate-50 divide-solid", className) }
        >
            <div className={ twMerge("flex flex-row gap-1 px-2 py-1 bg-white", showAutoComplete ? "rounded-t-lg" : "rounded-lg") }>
                <div className="flex relative">
                    <input
                        className="px-4 py-2 w-64 grow shrink focus:outline-none  bg-white"
                        placeholder={ strings.businesses.businessView.searchBar.placeholder }
                        value={ currentQuery }
                        onChange={ (e) => setCurrentQuery(e.currentTarget.value) }
                        ref={ inputRef }
                        onFocus={() => setShowAutoComplete(true)}
                        onBlur={ () => autoCompleteClick ? {} : setShowAutoComplete(false)}
                        onKeyDown={ (ke) => {
                            // has to be flipped, because we are indexing top-to-bottom
                            if (ke.key === "ArrowDown") { ke.preventDefault(); updateCurrentHoverHandler(1) }
                            else if (ke.key === "ArrowUp") { ke.preventDefault(); updateCurrentHoverHandler(-1) }
                            else if (ke.key === "Enter") { triggerSelection(); inputRef.current!.blur() }
                        }}
                        onMouseEnter={() => setCurrentHover(null)}
                    />
                    {/* this div is needed for the gradient effect in the end that shows the text extends beyond the limits */}
                    <div className="absolute right-0 h-full w-10 bg-gradient-to-l from-white to-transparent"></div>
                </div>
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