import { GetStaticProps, InferGetStaticPropsType } from "next"
import { createContext, ReactElement, useEffect } from "react"
import 'mapbox-gl/dist/mapbox-gl.css'

import { getPublishedRecords } from "@api/business"
import { NextPageWithLayout } from "../_app"
import { AppLayout } from "@layouts/app"
import { BusinessCategory, BusinessModel } from "@api/business/types"

import { log } from 'next-axiom'
import { BusinessViewContextData } from "@appTypes/businesses"
import { BusinessView } from "@components/business/BusinessView"
import { InfoPanel } from "@components/business/InfoPanel"

import { atomSelectedBusinessID, atomSearchQuery, atomSelectedCategories, atomAllBusinesses } from "src/atoms/businesses"
import { useAtom } from "jotai"
import strings from "@utils/strings"

import { Search as IconSearch } from "@mui/icons-material"
import { businessCategoryConverter } from "@utils/converters"
import { Checkbox, InputBase, ListItemText, MenuItem, Select } from "@mui/material"
import { BUSINESS_CATEGORIES } from "@utils/config"

const logger = log.with({ from: 'page.businesses.index' })

/**
 * Stores the global view-related context that is passed down to all the elements of the view.
 */
export const BusinessViewContext = createContext<BusinessViewContextData>({
    logger
});

const Main: NextPageWithLayout = ({ businesses }: InferGetStaticPropsType<typeof getStaticProps>) => {

    logger.with({ component: 'Main' }).debug("Loading Main...")

    const [ selectedID, ] = useAtom(atomSelectedBusinessID)
    const [ searchQuery, setSearchQuery ] = useAtom(atomSearchQuery)
    const [ selectedCategories, setSelectedCategories ] = useAtom(atomSelectedCategories)
    const [ _, setAllBusinesses ] = useAtom(atomAllBusinesses)

    // set all businesses when the props are changed
    useEffect(() => {
        setAllBusinesses(businesses)
    }, [ businesses, setAllBusinesses ])

    const search = (value: string) => {
        setSearchQuery(value);
    }

    const categories = (value: Array<BusinessCategory>) => {
        setSelectedCategories(value);
    }

    // context vars to pass down to the child components
    const context = {
        logger
    }

    const content = selectedID !== "" ? (
        <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 lg:grid-cols-4 w-full h-full">
            <BusinessView
                className="lg:col-span-3"
            />
            <InfoPanel
                className="lg:col-span-1"
            />
        </div>
    ) : (
        <div className="w-full h-full">
            <BusinessView />
        </div>
    )

    return (
        <>
            <BusinessViewContext.Provider value={ context }>
                { content }
            </BusinessViewContext.Provider>
            {/* the search bar */}
            <div className="flex flex-col md:flex-row absolute top-2 left-20 gap-6">
                <div className="flex flex-row bg-slate-50 rounded-lg items-center drop-shadow-md gap-4 px-4 p-2 h-12">
                    <IconSearch className="text-gray-600" />
                    <input
                        placeholder={ strings.businesses.businessView.searchBarLabel }
                        className="focus:outline-none bg-slate-50 w-44 lg:w-64"
                        onChange={ e => search(e.target.value) }
                        aria-label='search businesses'
                        defaultValue={ searchQuery }
                        type="text"
                    />
                </div>
                <div className="flex flex-row items-center drop-shadow-md gap-4 cursor-pointer">
                    <Select
                        multiple
                        displayEmpty
                        value={ selectedCategories }
                        onChange={
                            evt => categories(
                                typeof evt.target.value === "string" ? evt.target.value.split(',').map(e => BusinessCategory[e] || "") : evt.target.value ?? []
                            )
                        }
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
                </div>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    let businesses : Array<BusinessModel> = await getPublishedRecords()

    logger.debug("Loaded businesses: ", businesses)

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
