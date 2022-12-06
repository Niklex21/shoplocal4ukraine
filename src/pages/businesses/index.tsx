import { GetServerSideProps } from "next"
import React, { createContext, ReactElement, useEffect, useState } from "react"
import 'mapbox-gl/dist/mapbox-gl.css'

import { getPublishedRecords } from "@api/business"
import { NextPageWithLayout } from "../_app"
import { AppLayout } from "@layouts/app"
import { BusinessCategory, BusinessModel, Tag } from "@api/business/types"

import { log } from 'next-axiom'
import { BusinessViewContextData, PanelState, SearchedSerializedBusiness } from "@appTypes/businesses"
import { BusinessView } from "@components/business/BusinessView"
import { InfoPanel } from "@components/business/InfoPanel"

import { atomSearchQuery, atomSelectedCategories, atomAllBusinesses, atomSelectedTags, atomCurrentBusiness, atomSearchedBusinesses, atomSelectedBusinessID } from "src/atoms/businesses"
import { useAtom } from "jotai"
import strings from "@utils/strings"

import { Search as IconSearch, Close as IconClose, ArrowLeft as IconArrowLeft, ArrowRight as IconArrowRight } from "@mui/icons-material"
import { businessCategoryConverter, tagConverter } from "@utils/converters"
import { Checkbox, IconButton, InputBase, ListItemText, MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material"
import { BUSINESS_CATEGORIES, BUSINESS_TAGS } from "@utils/config"
import { isEmpty } from "@utils/utils"
import { twMerge } from "tailwind-merge"
import { isMobile } from "react-device-detect"

const logger = log.with({ from: 'page.businesses.index' })

/**
 * Stores the global view-related context that is passed down to all the elements of the view.
 */
export const BusinessViewContext = createContext<BusinessViewContextData>({
    logger
});

const Main: NextPageWithLayout = ({ businesses }: any) => {

    logger.with({ component: 'Main' }).debug("Loading Main...")

    const [ selectedBusiness ] = useAtom(atomCurrentBusiness)
    const [ searchQuery, setSearchQuery ] = useAtom(atomSearchQuery)
    const [ selectedCategories, setSelectedCategories ] = useAtom(atomSelectedCategories)
    const [ selectedTags, setSelectedTags ] = useAtom(atomSelectedTags)
    const [ searchedBusinesses ] = useAtom(atomSearchedBusinesses)
    const [ , setAllBusinesses ] = useAtom(atomAllBusinesses)
    const [ selectedBusinessId, setSelectedBusinessId ] = useAtom(atomSelectedBusinessID)

    const [ infoPanelState, setInfoPanelState ] = useState<PanelState>(PanelState.Closed)

    // stores whether or no the autocomplete for the search field should be displayed
    const [ autoCompleteState, setAutoCompleteState ] = useState<boolean>(false)

    // set all businesses when the props are changed
    useEffect(() => {
        setAllBusinesses(businesses)
    }, [ businesses, setAllBusinesses ])

    useEffect(() => {
        if (selectedBusinessId.length > 0) {
            setInfoPanelState(PanelState.Open)
        } else {
            setInfoPanelState(PanelState.Closed)
        }
    }, [ selectedBusinessId, setInfoPanelState ])

    /**
     * Handles change in the category selector.
     */
    const handleCategoryChange = (event: SelectChangeEvent<BusinessCategory[]>) => {

        let target : Array<BusinessCategory> = []

        if (typeof event.target.value === "string") {
            let currentTarget : Array<string> = event.target.value.split(',')
            currentTarget.forEach(
                (category: string) => {
                    if (category in BusinessCategory) {
                        target.push(BusinessCategory[category as any] as unknown as BusinessCategory)
                    }
                }
            )
        } else {
            target = event.target.value ?? []
        }

        setSelectedCategories(target)
    }

    /**
     * Handles change in the tags selector.
     */
     const handleTagsChange = (event: SelectChangeEvent<Tag[]>) => {

        let target : Array<Tag> = []

        if (typeof event.target.value === "string") {
            let currentTarget : Array<string> = event.target.value.split(',')
            currentTarget.forEach(
                (tag: string) => {
                    if (tag in Tag) {
                        target.push(Tag[tag as any] as unknown as Tag)
                    }
                }
            )
        } else {
            target = event.target.value ?? []
        }

        setSelectedTags(target)
    }

    // context vars to pass down to the child components
    const context = {
        logger
    }

    // TODO: this really should probably be a part of the infopanel, but it hasn't been working well so far
    const ToggleStateButton = ({ className }: { className?: string }) => (
        <Tooltip
            title={ 
                infoPanelState === PanelState.Closed ? 
                strings.businesses.infoPage.tooltipOpenPanel
                : strings.businesses.infoPage.tooltipClosePanel
            }
            placement="right"
            arrow={ true }
        >
            <IconButton
                className={
                    twMerge(
                        "md:flex bg-white font-bold -translate-y-1/2 p-1 drop-shadow-xl py-4 rounded-none rounded-r-lg hover:bg-white hover:brightness-95",
                        className
                    )
                }
                onClick={
                    infoPanelState === PanelState.Closed ?
                    () => setInfoPanelState(PanelState.Open)
                    : () => setInfoPanelState(PanelState.Closed)
                }
            >
                {
                    infoPanelState === PanelState.Closed ?
                    (<IconArrowRight />)
                    : (<IconArrowLeft />)
                }
            </IconButton>
        </Tooltip>
    )

    const content = (
        <>
            <InfoPanel panelState={ infoPanelState } setPanelState={ setInfoPanelState } className="transition-all duration-200" />
            <div
                className={
                    twMerge(
                        "h-full flex flex-row w-full transition-all duration-200 justify-end items-center",
                    )
                }
                onClick={ () => setAutoCompleteState(false) }
            >
                {/* BROWSER VIEW */}
                <div className={ twMerge("hidden md:flex h-full", infoPanelState === PanelState.Open ? "w-3/4" : "w-full") }>
                    <div className={ twMerge("flex w-0 h-full overflow-visible", selectedBusinessId.length > 0 ? "" : "hidden") }>
                        <ToggleStateButton className="z-10 my-auto" />
                    </div>
                    <BusinessView />
                </div>
                {/* MOBILE VIEW */}
                <BusinessView className="flex md:hidden" />
            </div>
        </>
    )

    return (
        <>
            <BusinessViewContext.Provider value={ context }>
                { content }
            </BusinessViewContext.Provider>
            {/* the search bar */}
            <div className="flex flex-col md:flex-row absolute top-2 left-20 gap-6 items-start z-40">
                <div 
                    className={ twMerge("flex flex-col bg-slate-50 rounded-lg drop-shadow-md px-4", autoCompleteState ? "pb-2" : "") } 
                >
                    <div className="flex flex-row gap-4 h-12 items-center">
                        <IconSearch className="text-gray-600" />
                        <input
                            placeholder={ strings.businesses.businessView.searchBarLabel }
                            className="focus:outline-none bg-slate-50 w-44 lg:w-48"
                            onChange={ e => setSearchQuery(e.target.value) }
                            aria-label='search businesses'
                            type="text"
                            value={ searchQuery }
                            onFocus={ () => setAutoCompleteState(true) }
                        />
                        <IconButton 
                            onClick={
                                () => {
                                    setSearchQuery("")
                                    setSelectedBusinessId("")
                                    setAutoCompleteState(false)
                                }
                            }
                            className={ searchQuery.length > 0 ? "" : "invisible" }
                        >
                            <IconClose />
                        </IconButton>
                    </div>
                    <hr className={ autoCompleteState ? "" : "hidden" } />
                    <div className={ twMerge("flex flex-col items-start my-2", autoCompleteState ? "" : "hidden") }>
                        {
                            searchedBusinesses.length > 0 ?
                            searchedBusinesses.slice(0, Math.max(1, Math.min(searchedBusinesses.length - 1, 4))).map(
                                (b : SearchedSerializedBusiness, index: number) => (
                                    <div
                                        className="flex w-full p-2 bg-slate-50 hover:brightness-95 hover:cursor-pointer rounded-lg"
                                        key={ index }
                                        onClick={ 
                                            () => {
                                                setSearchQuery(b.item.name)
                                                setSelectedBusinessId(b.item.id)
                                                setAutoCompleteState(false)
                                            }
                                        }
                                    >
                                        { b.item.name }
                                    </div>
                                )
                            )
                            : strings.businesses.noBusinessesFoundShort
                        }
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center drop-shadow-md gap-4 cursor-pointer">
                    <Select
                        multiple
                        displayEmpty
                        value={ selectedCategories }
                        onChange={ handleCategoryChange }
                        input={ <InputBase className="bg-slate-50 w-44 lg:w-64 h-12 px-4 p-2 rounded-lg cursor-pointer" /> }
                        renderValue={
                            selected => {
                                return selected.length > 0
                                    ? selected.map(s => businessCategoryConverter(s)).join(', ')
                                    : strings.businesses.businessView.categorySelectLabel
                            }
                        }
                        className="outline-none cursor-pointer"
                    >
                        {
                            BUSINESS_CATEGORIES.map(
                                (value: BusinessCategory, index: number) => (
                                    <MenuItem key={ index } value={ value }>
                                        <Checkbox checked={ selectedCategories.indexOf( value ) > -1 } />
                                        <ListItemText primary={ businessCategoryConverter(value) } />
                                    </MenuItem>
                                )
                            )
                        }
                    </Select>
                    <Select
                        multiple
                        displayEmpty
                        value={ selectedTags }
                        onChange={ handleTagsChange }
                        input={ <InputBase className="bg-slate-50 w-44 lg:w-64 h-12 px-4 p-2 rounded-lg cursor-pointer" /> }
                        renderValue={
                            selected => {
                                return selected.length > 0
                                    ? selected.map(s => tagConverter(s)).join(', ')
                                    : strings.businesses.businessView.tagSelectLabel
                            }
                        }
                        className="outline-none cursor-pointer"
                    >
                        {
                            BUSINESS_TAGS.map(
                                (value: Tag, index: number) => (
                                    <MenuItem key={ index } value={ value }>
                                        <Checkbox checked={ selectedTags.indexOf( value ) > -1 } />
                                        <ListItemText primary={ tagConverter(value) } />
                                    </MenuItem>
                                )
                            )
                        }
                    </Select>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    let businesses : Array<BusinessModel> = await getPublishedRecords()

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    logger.debug(`Loaded ${ businesses.length } businesses`)

    return {
        props: {
            businesses
        }
    }
}


Main.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            { page }
        </AppLayout>
    )
}

export default Main
