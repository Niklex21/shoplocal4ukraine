import { Badge, IconButton, SvgIcon, Tooltip } from "@mui/material"
import { createElement, createRef, ReactNode, useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Search as IconSearch, Clear as IconClear, Search as IconBusiness, Add, Close, FilterList as IconFilterList } from "@mui/icons-material"
import strings from "@utils/strings"
import { useAtom } from "jotai"
import { atomSearchQuery, atomCurrentQuery, atomAutocompleteSuggestions, atomSelectedBusinessID, atomSelectedCategories, atomSelectedTags, atomSelectedFromSearch, atomSearchHistory } from "src/atoms/businesses"
import { businessCategoryConverter, getAutocompleteCategoryIcon, tagConverter } from "@utils/converters"
import Link from "next/link"
import { AutocompleteSuggestion, AutocompleteSuggestionCategory } from "@appTypes/businesses"
import { BusinessCategory, Tag } from "@api/business/types"

type Props = {
    className?: string
}

export default function SearchBar({ className }: Props) {

    const [ showAutoComplete, setShowAutoComplete ] = useState<boolean>(false)
    const [ showFilters, setShowFilters ] = useState<boolean>(false)
    const [ searchQuery, setSearchQuery ] = useAtom(atomSearchQuery)
    const [ currentQuery, setCurrentQuery ] = useAtom(atomCurrentQuery)
    const [ selectedFromSearch, setSelectedFromSearch ] = useAtom(atomSelectedFromSearch)
    // stores the currently hovered state with arrow keys or mouse
    const [ currentHover, setCurrentHover ] = useState<number | null>(null)
    const [ autoCompleteOptions ] = useAtom(atomAutocompleteSuggestions)
    const [ , setBusinessId ] = useAtom(atomSelectedBusinessID)
    const [ selectedCategories, setSelectedCategories ] = useAtom(atomSelectedCategories)
    const [ selectedTags, setSelectedTags ] = useAtom(atomSelectedTags)
    // this is needed because blur event prevents handling onmouseup in any form
    // this way, the behaviour is natural
    const [ autoCompleteClick, setAutocompleteClick ] = useState<boolean>(false)
    const [ searchHistory, setSearchHistory ] = useAtom(atomSearchHistory)

    const inputRef = useRef<HTMLInputElement | null>(null)
    // stores the values currently shown to the user, as we may know display search history, apart from the auto-complete-options
    const currentOptions = currentQuery === "" ? searchHistory.slice(Math.max(searchHistory.length - 5, 0)).reverse() : autoCompleteOptions

    const filtersCount = selectedCategories.length + selectedTags.length

    useEffect(() => {
        if (currentQuery === "") {
            setSearchQuery(currentQuery)
            if (selectedFromSearch) setBusinessId("")
        }
    }, [ currentQuery, setSearchQuery, setBusinessId, selectedFromSearch ])

    useEffect(() => {
        if (filtersCount === 0) setShowFilters(false)
    }, [ filtersCount ])

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

    // a utility to push the current item to the search history storage
    const addSearchHistory = (search: AutocompleteSuggestion) => {
        // TODO: kind of a hack, should be limited at the atom state ideally
        if (searchHistory.length === 100) setSearchHistory(searchHistory.slice(1))

        search = {
            ...search,
            history: true
        }

        // filter is so that previous history items are removed
        setSearchHistory([
            ...searchHistory.filter(x => JSON.stringify(x) != JSON.stringify(search)),
            search
        ])
    }

    /**
     * Updates the current hover counter by the value provided.
     *
     * @param value should usually be +1 if the counter should be increased (going down) or -1 (if we are going up)
     */
    const updateCurrentHoverHandler = (value: number) => {
        // need to start from -1 if we are going up from null
        let hover = currentHover ?? (value === 1 ? -1 : 0)

        let n = currentOptions.length
        // this weird formula is so we rotate properly
        // this formula takes a modulo, rather than the remainder (%)
        setCurrentHover((((hover + value) % n ) + n) % n)
    }

    const triggerSelection = (index?: number) => {
        // if we are not selecting anything from the options
        if (currentHover === null && index === null) {
            setSearchQuery(currentQuery)
            addSearchHistory({
                text: currentQuery,
                category: AutocompleteSuggestionCategory.Search
            })
            return
        }

        // the one we are choosing
        // added a "!" because one of them has to be valid per the if above, and compiler doesn't realize that
        let option = currentOptions[(index !== null && index !== undefined ? index : currentHover)!]

        // if we are just entering the search query
        if (option === undefined || option === null) {
            if (currentQuery === "") {
                return
            }

            setSearchQuery(currentQuery)
            addSearchHistory({
                text: currentQuery,
                category: AutocompleteSuggestionCategory.Search
            })
            return
        }

        addSearchHistory(option)

        switch (option.category) {
            case AutocompleteSuggestionCategory.Business:
                setCurrentQuery(option.text)
                setBusinessId(option.properties?.businessId ?? "")
                setSelectedFromSearch(true)
                return
            case AutocompleteSuggestionCategory.Category:
                setCurrentQuery("")
                let c = option.properties?.categoryId ?? -1
                if (!selectedCategories.includes(c)) setSelectedCategories([...selectedCategories, c])
                return
            case AutocompleteSuggestionCategory.Tag:
                setCurrentQuery("")
                let t = option.properties?.tagId ?? -1
                if (!selectedTags.includes(t)) setSelectedTags([...selectedTags, t])
                return
            case AutocompleteSuggestionCategory.Search:
                setCurrentQuery(option.text)
                setSearchQuery(option.text)
                return
        }
    }

    const clearSearchHistory = () => {
        setSearchHistory([])
    }

    const autoComplete = (
        <div className={ twMerge("relative bg-white py-2 rounded-b-lg", showAutoComplete ? "flex flex-col" : "hidden") }>
            {
                currentOptions.length > 0
                ? (
                    <>
                        { 
                            currentOptions.map(
                                ({ text, category, matches, ...props }, index) => (
                                    <span
                                        className={
                                            twMerge(
                                                "flex gap-4 flex-row items-align-middle px-6 py-2 cursor-pointer text-slate-500 text-base",
                                                index == currentHover ? "bg-slate-100" : "bg-white"
                                            )
                                        }
                                        key={ index }
                                        onMouseEnter={ () => setCurrentHover(index) }
                                        onMouseLeave={ () => setCurrentHover(null) }
                                        onMouseDown={ () => setAutocompleteClick(true) }
                                        onMouseUp={ () => { setAutocompleteClick(false); triggerSelection(index); } }
                                    >
                                        <span className="flex my-auto text-slate-300">{ createElement(getAutocompleteCategoryIcon({ text, category, matches, ...props})) }</span>
                                        <span className="">{ matches && currentQuery !== "" ? getBoldText(text, matches[0].indices) : text }</span>
                                    </span>
                                )
                            )
                        }
                        <span
                            className="italic underline text-slate-500 hover:text-ukraine-blue px-6 py-2 cursor-pointer mr-auto"
                            onMouseDown={ () => setAutocompleteClick(true) }
                            onMouseUp={ () => { setAutocompleteClick(false); clearSearchHistory(); } }
                        >
                            { strings.businesses.businessView.searchBar.autocomplete.clearSearch }
                        </span>
                    </>
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
                            onMouseLeave={ () => setCurrentHover(null) }
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

    // utility function to remove a category
    const removeCategory = (value: BusinessCategory) => {
        setSelectedCategories(selectedCategories.filter(item => item !== value))
    }

    // utility function to remove a tag
    const removeTag = (value: Tag) => {
        setSelectedTags(selectedTags.filter(item => item !== value))
    }

    const clearAllFilters = () => {
        setSelectedTags([])
        setSelectedCategories([])
    }

    const filtersApplied = (
        <div className={ twMerge("relative bg-white py-4 px-6 rounded-b-lg gap-4", showFilters ? "flex flex-col" : "hidden") }>
            <span className="font-bold">{ strings.businesses.businessView.searchBar.filters.title }</span>
            <div className="flex flex-col gap-2 p-4 w-full rounded-md bg-blue-50">
                <span className="">{ strings.businesses.businessView.searchBar.filters.categoryTitle }</span>
                <div className="flex flex-wrap gap-1">
                    {
                        selectedCategories.map(
                            (value, index) => (
                                <span className="pl-3 pr-1 py-1 rounded-full align-middle flex gap-1 bg-blue-100 text-sm my-auto hover:brightness-95" key={ index }>
                                    <span className="flex my-auto">{ businessCategoryConverter(value) }</span>
                                    <IconButton className="cursor-pointer bg-blue-200" onClick={ () => removeCategory(value) }>
                                        <Close className="text-xs" />
                                    </IconButton>
                                </span>
                            )
                        )
                    }
                </div>
            </div>
            <span className="uppercase">{ strings.businesses.businessView.searchBar.filters.and }</span>
            <div className="flex flex-col gap-2 p-4 w-full rounded-md bg-yellow-50">
                <span className="">{ strings.businesses.businessView.searchBar.filters.tagsTitle }</span>
                <div className="flex flex-wrap gap-1">
                    {
                        selectedTags.map(
                            (value, index) => (
                                <span className="pl-3 pr-1 py-1 rounded-full text-center flex gap-1 bg-yellow-100 text-sm my-auto hover:brightness-95" key={ index }>
                                    <span className="flex my-auto">{ tagConverter(value) }</span>
                                    <IconButton className="cursor-pointer bg-yellow-200" onClick={ () => removeTag(value) }>
                                        <Close className="text-xs" />
                                    </IconButton>
                                </span>
                            )
                        )
                    }
                </div>
            </div>
            <span className="italic underline hover:text-ukraine-blue cursor-pointer mr-auto" onClick={ () => clearAllFilters() }>
                { strings.businesses.businessView.searchBar.filters.clearAll }
            </span>
        </div>
    )

    const toggleFilters = () => setShowFilters(!showFilters)

    return (
        <div
            className={ twMerge("flex shrink grow flex-col drop-shadow-md divide-y-2 divide-slate-50 divide-solid w-screen md:w-96", className) }
        >
            <div className={ twMerge("flex relative w-full flex-row gap-1 px-2 py-1 bg-white", showAutoComplete || showFilters ? "rounded-t-lg" : "rounded-lg") }>
                <Tooltip title={ strings.businesses.businessView.searchBar.tooltipFiltersIcon }>
                    <IconButton disabled={ filtersCount === 0 } onClick={ () => toggleFilters() }>
                        <Badge badgeContent={ filtersCount } color="primary">
                            <IconFilterList />
                        </Badge>
                    </IconButton>
                </Tooltip>
                <div className="flex w-full relative">
                    <input
                        className="px-4 py-2 w-full focus:outline-none bg-white"
                        placeholder={ strings.businesses.businessView.searchBar.placeholder }
                        value={ currentQuery }
                        onChange={ (e) => setCurrentQuery(e.currentTarget.value) }
                        ref={ inputRef }
                        onFocus={() => { setShowAutoComplete(true); setShowFilters(false); } }
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
                            : triggerSelection()
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
            { filtersApplied }
            { autoComplete }
        </div>
    )
}
