import { BusinessCard, BusinessContainer, BusinessMapMarker } from "@components/business"
import { Container } from "@components/common"
import { Collections as IconCollections, Map as IconMap } from "@mui/icons-material"
import { Chip, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useMemo, useState } from "react"
import 'mapbox-gl/dist/mapbox-gl.css'

import Map from "react-map-gl"

import { getPublishedRecords } from "@api/business"
import { NextPageWithLayout } from "../_app"
import { AppLayout } from "@layouts/app"
import config from "@utils/config"
import strings from "@utils/strings"


const Main: NextPageWithLayout = ({ businesses }: InferGetStaticPropsType<typeof getStaticProps>) => {
    
    // stores the currently selected business
    const [selectedID, setSelectedID] = useState<number>(-1);

    // context vars to pass down to the child components
    const context = {
        selectedID,
        businesses,
        setSelectedID
    }

    return (
        <div className="grid grid-cols-3 w-full">
            <BusinessViewContext.Provider value={ context }>
                <BusinessView className="col-span-2" />
                <InfoPanel className="col-span-1" />
            </BusinessViewContext.Provider>
        </div>
    )
}

/**
 * The type of the context data.
 */
 type BusinessViewContextData = {
    selectedID: number,
    businesses: any,
    setSelectedID: Dispatch<SetStateAction<number>>
};

/**
 * Stores the global view-related context that is passed down to all the elements of the view.
 */
const BusinessViewContext = createContext<BusinessViewContextData>({
    selectedID: -1,
    businesses: [], 
    setSelectedID: (_: SetStateAction<number>) => {}
});

export const getStaticProps: GetStaticProps = async (context) => {
    let businesses = await getPublishedRecords()

    // If businesses is defined (truthy), get a raw JSON map for each record
    // this is acceptable because we do not define the schema (it comes from Airtable)
    // and we want our code to work even if they change it
    businesses = businesses ? businesses.map((b : any) => b._rawJson) : []

    return {
        props: {
            businesses
        }
    }
}

/**
 * The info panel on the right that displays the details of the selected business.
 */
const InfoPanel = ({ className }: any) => {

    const { businesses, selectedID } = useContext(BusinessViewContext)

    const data = selectedID < 0 ? null : businesses[selectedID].fields

    const Info = 
        data === null
        ? (<>{ strings.businesses.info.noBusinessSelected }</>)
        : (
            <>
                <h1 className="text-2xl font-bold">{ data['Name'] }</h1>
                <div>
                    <Chip className="text-lg" label={ data['Affiliation Type']} />
                    <Chip className="text-lg" label= { data['Business category'] } />
                    <Chip className="text-lg" label= { data['City/town'] } />
                    <Chip className="text-lg" label= { data['Country'] } />
                </div>
                <h3 className="max-w-prose italic">{ data['Description'] }</h3>
            </>
        )

    return (
        <Container className={ `${className} flex-col max-w-full overflow-auto` }>
            { Info }
        </Container>
    )
}

/**
 * Defines the available types of business views.
 */
enum Views {
    Gallery,
    Map
}

/**
 * The panel that displays the businesses -- whether it is in a gallery, map, 
 * or some other view.
 */
const BusinessView = ({ className }: any) => {

    const [view, setView] = useState<Views>(Views.Gallery);

    // handles the toggle option selection
    const handleViewSelection = (
        event: React.MouseEvent<HTMLElement>,
        newSelection: Views,
    ) => {
        // can't deselect the options, at least one must be selected
        if (newSelection !== null) {
            setView(newSelection);
        }
    };

    // the view component that actually contains the businesses display
    const ViewComponent = (() => {
        switch(view) {
            case Views.Gallery:
                return GalleryView;
            case Views.Map:
                return MapView;
            }
        }
    )();

    return (
        <Container className={ `${className} flex-col overflow-auto max-h-screen` }>
            <ToggleButtonGroup
                value={ view }
                exclusive
                onChange={ handleViewSelection }
                aria-label="views"
            >
                {/* TODO: do we need to add some text to the choices? */}
                <ToggleButton value={ Views.Gallery } aria-label="gallery">
                    <IconCollections />
                </ToggleButton>
                <ToggleButton value={ Views.Map } aria-label="map">
                    <IconMap />
                </ToggleButton>
            </ToggleButtonGroup>
            <ViewComponent />
        </Container>
    )
}

/**
 * Displays the businesses as a gallery of clickable cards.
 */
const GalleryView = ({ className }: any) => {

    const { businesses, setSelectedID } = useContext(BusinessViewContext);

    return (
        <BusinessContainer>
          {
            businesses.map(
                ({ fields }: { fields: Object }, index: number) => (
                    <div className="cursor-pointer" key={ index } onClick={ () => { setSelectedID(index)} }>
                        <BusinessCard fields={ fields }/>
                    </div>
                )
            )
          }
        </BusinessContainer>
    )
}

const MapView = ({ className } : any) => {

    const { businesses, setSelectedID, selectedID } = useContext(BusinessViewContext)

    const selectedBusiness = 
        selectedID < 0
        ? null
        : businesses[selectedID].fields

    return (
        <Map
            initialViewState={{
                longitude: selectedBusiness !== null ? selectedBusiness.longitude : config.mapDefaults.longitude,
                latitude: selectedBusiness !== null ? selectedBusiness.latitude : config.mapDefaults.latitude,
                zoom: config.mapDefaults.zoom
            }}
            style={{width: '100%', height: '100vh' }}
            mapStyle="mapbox://styles/mapbox/streets-v9" 
            mapboxAccessToken={ process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN }
            >
                {
                    businesses.map(
                        ({ fields } : { fields: Object }, index: number) => (
                            <BusinessMapMarker key={ index } onClickEventHandler={ () => { setSelectedID(index)} } fields={ fields } />
                        )
                    )
                }
        </Map>
    )
}

Main.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            { page }
        </AppLayout>
    )
}

export default Main
