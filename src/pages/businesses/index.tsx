import { GetStaticProps, InferGetStaticPropsType } from "next"
import { createContext, ReactElement } from "react"
import 'mapbox-gl/dist/mapbox-gl.css'

import { getPublishedRecords } from "@api/business"
import { NextPageWithLayout } from "../_app"
import { AppLayout } from "@layouts/app"
import { BusinessModel } from "@api/business/types"

import { log } from 'next-axiom'
import Fuse from 'fuse.js'
import { BusinessViewContextData, FilteredBusiness } from "@appTypes/businesses"
import { BusinessView } from "@components/business/BusinessView"
import { InfoPanel } from "@components/business/InfoPanel"

import { atomSelectedBusinessID, atomFilteredBusinesses, atomSearchQuery } from "src/atoms/businesses"
import { businessToFilteredBusiness, findBusinessById } from "@utils/utils"
import { useAtom } from "jotai"
import strings from "@utils/strings"

import { Search as IconSearch } from "@mui/icons-material"

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

    const fuseSearch = new Fuse<BusinessModel>(businesses, {
        includeScore: true,
        keys: ['name', 'businessCategory', 'tags', 'location.address', 'location.city', 'location.country', 'description']
    })

    const [ filteredBusinesses, setFilteredBusinesses ] = useAtom(atomFilteredBusinesses)

    const search = (value: string) => {
        setSearchQuery(value);
        setFilteredBusinesses(fuseSearch.search(value));
    }

    // context vars to pass down to the child components
    const context = {
        logger
    }

    const currentBusinesses : Array<FilteredBusiness> = 
        filteredBusinesses.length > 0
        ? filteredBusinesses
        : businesses.map((b : BusinessModel) => businessToFilteredBusiness(b))
    
    const content = selectedID !== "" ? (
        <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 lg:grid-cols-4 w-full h-full">
            <BusinessView
                className="lg:col-span-3"
                businesses={ currentBusinesses }
            />
            <InfoPanel
                className="lg:col-span-1"
                business={ findBusinessById(businesses, selectedID) }
            />
        </div>
    ) : (
        <div className="w-full h-full">
            <BusinessView businesses={ currentBusinesses } />
        </div>
    )

    return (
        <>
            <BusinessViewContext.Provider value={ context }>
                { content }
            </BusinessViewContext.Provider>
            {/* the search bar */}
            <div className="flex flex-row absolute top-2 left-20 h-12 gap-4 bg-slate-50 rounded-lg items-center px-4 p-2 drop-shadow-md">
                <IconSearch className="text-gray-600" />
                <input
                    placeholder={ strings.businesses.businessView.searchBarLabel }
                    className="focus:outline-none bg-slate-50 w-44 lg:w-64"
                    onChange={ e => search(e.target.value) }
                    aria-label='search google maps'
                    defaultValue={ searchQuery }
                    type="text"
                />
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
