import { BusinessCard, BusinessContainer, BusinessMapMarker } from "@components/business"
import { Container } from "@components/common"
import { Collections as IconCollections, Map as IconMap, Place as IconPlace, Email as IconEmail, Link as IconLink, Phone as IconPhone, SvgIconComponent } from "@mui/icons-material"
import { Card, CardContent, CardMedia, Chip, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useState } from "react"
import 'mapbox-gl/dist/mapbox-gl.css'

import Map, { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl"

import { getPublishedRecords } from "@api/business"
import { NextPageWithLayout } from "../_app"
import { AppLayout } from "@layouts/app"
import defaults from "@utils/config"
import strings from "@utils/strings"
import Link from "next/link"
import Image from "next/image"
import { BusinessModel, Tag } from "@api/business/types"
import { tagConverter, businessCategoryConverter, businessViewConverter } from "@utils/converters"
import { urlShortener } from "@utils/utils"

import { twMerge } from "tailwind-merge"
import { log } from 'next-axiom'

const logger = log.with({ from: 'page.businesses.index' })

const Main: NextPageWithLayout = ({ businesses }: InferGetStaticPropsType<typeof getStaticProps>) => {

    // stores the currently selected business
    const [selectedID, setSelectedID] = useState<number>(-1);

    // context vars to pass down to the child components
    const context = {
        selectedID,
        businesses,
        setSelectedID
    }

    const content = selectedID !== -1 ? (
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

/**
 * The type of the context data.
 */
 type BusinessViewContextData = {
    selectedID: number,
    businesses: Array<BusinessModel>,
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

/**
 * Contains an icon, content, link structure to define a list of contacts to be rendered later
 */
type ContactsRow = {
    icon: JSX.Element,
    content: string,
    link: string
}

/**
 * The info panel on the right that displays the details of the selected business.
 */
const InfoPanel = ({ className }: any) => {

    const { businesses, selectedID } = useContext(BusinessViewContext)

    let data : BusinessModel = {} as BusinessModel;
    let imageSrc: string = "";
    let contacts : Array<ContactsRow> = [];

    if (selectedID >= 0) {
        data = businesses[selectedID]
        imageSrc = data.images && data.images.length > 0 ? data.images[0] : defaults.businesses.gallery.defaultImage.src

        contacts = [
            {
                icon: (
                    <IconPlace />
                ),
                content: data.location?.city,
                link: data.location?.googleMapsURL
            },
            ...(data.website ? [{
                    icon: (
                        <IconLink />
                    ),
                    content: urlShortener(data.website),
                    link: data.website
                }] : []
            ),
            ...(data.email ? [{
                    icon: (
                        <IconEmail />
                    ),
                    content: data.email,
                    link: `mailto:${ data.email }`
                }] : []
            ),
            ...(data.phone ? [{
                    icon: (
                        <IconPhone />
                    ),
                    content: data.phone,
                    link: `tel:${ data.phone }`
                }] : []
            ),
        ]
    }

    const Info =
        selectedID < 0
        ? (<>{ strings.businesses.infoPage.noBusinessSelected }</>)
        : (
            <Card className='overflow-auto h-full w-full rounded-none'>
                <CardMedia
                  component="img"
                  className="h-48 hidden md:block"
                  image={ imageSrc }
                  alt={ data.name }
                />
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">{ data.name }</h1>
                        <div className="flex flex-wrap gap-2 flex-row">
                            <Chip className="text-base text-white bg-ukraine-blue" label={ businessCategoryConverter(data.businessCategory) } />
                            {
                                data.tags.map(
                                    (tag: Tag, index: number) => (
                                        <Chip key={ index } className="text-base text-black bg-ukraine-yellow" label={ tagConverter(tag) } />   
                                    )
                                )
                            }
                        </div>
                        <div className="relative md:hidden rounded-lg w-full h-48">
                            <Image
                                className="w-full object-contain rounded-lg"
                                layout="fill"
                                src={ imageSrc }
                                alt={ data.name }
                            />
                        </div>
                        <hr />
                        <div>
                            <h3 className="prose text-xl mb-2 font-semibold">{ strings.businesses.infoPage.sectionTitle.contacts }</h3>
                            {
                                contacts.map(
                                    ({ icon, content, link } : { icon: JSX.Element, content: string, link: string }, index: number) => (
                                        <div key={ index } className="mt-1 cursor-pointer hover:text-ukraine-blue hover:opacity-100 opacity-80">
                                            <Link href={ link || "#" }>
                                                <div className="flex flex-nowrap flex-row gap-2">
                                                    { icon }
                                                    <div className="break-all">
                                                        { content }
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        <hr />
                        <div>
                            <h3 className="prose text-xl mb-1 font-semibold">{ strings.businesses.infoPage.sectionTitle.description }</h3>
                            <span className="prose break-words opacity-80">{ data.description }</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )

    logger.with({ component: "Info" }).debug(`Loading Info for selected business: ${ selectedID }`, data)

    return (
        <Container className={ twMerge('flex-col max-w-full overflow-auto p-0 md:h-screen border-t-2 border-black md:border-none', className) }>
            { Info }
        </Container>
    )
}

/**
 * Defines the available types of business views.
 */
export enum Views {
    Gallery,
    Map
}

/**
 * The panel that displays the businesses -- whether it is in a gallery, map,
 * or some other view.
 */
const BusinessView = ({ className }: any) => {

    const [view, setView] = useState<Views>(Views.Map);

    const bwLogger = logger.with({ component: 'BusinessView' })

    // handles the toggle option selection
    const handleViewSelection = (
        event: React.MouseEvent<HTMLElement>,
        newSelection: Views,
    ) => {
        bwLogger.debug(`New view click: ${ newSelection }`)

        // can't deselect the options, at least one must be selected
        if (newSelection !== null) {
            setView(newSelection);

            bwLogger.info(`New view selection: ${ newSelection }`)
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

    bwLogger.debug(`Loading BusinessView for view: ${ businessViewConverter(view) }`)

    return (
        <Container className={ twMerge(`flex-col overflow-auto h-full max-h-screen ${ view === Views.Map ? 'p-0' : '' }`, className) }>
            <ToggleButtonGroup
                value={ view }
                exclusive
                onChange={ handleViewSelection }
                aria-label="views"
                className="absolute top-2 left-2 z-50 bg-slate-50"
            >
                <ToggleButton value={ Views.Map } aria-label="map">
                    <IconMap />&nbsp;<span className="uppercase">{ businessViewConverter(Views.Map) }</span>
                </ToggleButton>
                <ToggleButton value={ Views.Gallery } aria-label="gallery">
                    <IconCollections />&nbsp;<span className="uppercase">{ businessViewConverter(Views.Gallery) }</span>
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

    const { businesses, setSelectedID, selectedID } = useContext(BusinessViewContext);

    logger.with({ component: 'GalleryView' }).debug("Loading GalleryView...")

    // sort by name, alphabetically in ascending order
    const sortedBusinesses = businesses.sort((a: BusinessModel, b: BusinessModel) => a.name.localeCompare(b.name))

    return (
        <BusinessContainer className={ className }>
          {
            sortedBusinesses.map(
                (data: BusinessModel, index: number) => (
                    <div className="cursor-pointer" key={ index } onClick={ () => { setSelectedID(index)} }>
                        <BusinessCard
                            data={ data }
                            active={ index === selectedID }
                        />
                    </div>
                )
            )
          }
        </BusinessContainer>
    )
}

const MapView = ({ className } : any) => {

    const { businesses, setSelectedID, selectedID } = useContext(BusinessViewContext)

    const selectedBusiness : BusinessModel =
        selectedID < 0
        ? {} as BusinessModel
        : businesses[selectedID]

    const longitude = selectedBusiness.location?.longitude ?? defaults.businesses.map.longitude
    const latitude = selectedBusiness.location?.latitude ?? defaults.businesses.map.latitude
    const zoom = defaults.businesses.map.zoom

    logger.with({ component: 'MapView' }).debug(`Loading MapView with default longitude ${ longitude }, latitude ${ latitude }, and zoom ${ zoom }`)

    return (
        <div className={ twMerge('w-full h-screen', className) }>
            <Map
                initialViewState={{
                    longitude: longitude,
                    latitude: latitude,
                    zoom: zoom
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={ process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN }
                >
                    <GeolocateControl />
                    <NavigationControl />
                    <ScaleControl />

                    {/* markers */}
                    {
                        businesses.map(
                            (data: BusinessModel, index: number) => (
                                <BusinessMapMarker
                                    key={ index }
                                    onClickEventHandler={ () => { setSelectedID(index)} }
                                    data={ data }
                                    active={ selectedID === index }
                                />
                            )
                        )
                    }
            </Map>
        </div>
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
