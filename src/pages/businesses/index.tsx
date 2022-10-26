import { GetStaticProps, InferGetStaticPropsType } from "next"
import { createContext, ReactElement, SetStateAction, useState } from "react"
import 'mapbox-gl/dist/mapbox-gl.css'

import { getPublishedRecords } from "@api/business"
import { NextPageWithLayout } from "../_app"
import { AppLayout } from "@layouts/app"
import { BusinessModel } from "@api/business/types"

import { log } from 'next-axiom'
import Fuse from 'fuse.js'
import { BusinessViewContextData } from "src/types/businesses"
import { BusinessView } from "@components/business/BusinessView"
import { InfoPanel } from "@components/business/InfoPanel"

const logger = log.with({ from: 'page.businesses.index' })

/**
 * Stores the global view-related context that is passed down to all the elements of the view.
 */
export const BusinessViewContext = createContext<BusinessViewContextData>({
    selectedID: "",
    businesses: [],
    setSelectedID: (_: SetStateAction<string>) => {},
    fuseSearch: new Fuse<BusinessModel>([]),
    setFilteredBusinesses: (_: SetStateAction<Array<Fuse.FuseResult<BusinessModel>>>) => {},
    filteredBusinesses: [],
    logger
});

const Main: NextPageWithLayout = ({ businesses }: InferGetStaticPropsType<typeof getStaticProps>) => {

    // stores the currently selected business
    const [selectedID, setSelectedID] = useState<string>("");

    const fuseSearch = new Fuse<BusinessModel>(businesses, {
        includeScore: true,
        keys: ['name', 'businessCategory', 'tags', 'location.address', 'location.city', 'location.country', 'description']
    })

    const [filteredBusinesses, setFilteredBusinesses] = useState<Array<Fuse.FuseResult<BusinessModel>>>([])

    // context vars to pass down to the child components
    const context = {
        selectedID,
        businesses,
        setSelectedID,
        fuseSearch,
        setFilteredBusinesses,
        filteredBusinesses,
        logger
    }

    const content = selectedID !== "" ? (
        <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 lg:grid-cols-4 w-full h-full">
            <BusinessView className="lg:col-span-3" />
            <InfoPanel className="lg:col-span-1" />
        </div>
    ) : (
        <div className="w-full h-full">
            <BusinessView />
        </div>
    )

    logger.with({ component: 'Main' }).debug("Loading Main...")

    return (
        <BusinessViewContext.Provider value={ context }>
            { content }
        </BusinessViewContext.Provider>
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
