import { BusinessCard, BusinessContainer, BusinessMapMarker } from "@components/business"
import { Container } from "@components/common"
import { Collections as IconCollections, Map as IconMap, Place as IconPlace, Email as IconEmail, Link as IconLink, Phone as IconPhone, SvgIconComponent } from "@mui/icons-material"
import { Card, CardContent, CardMedia, Chip, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { createContext, Dispatch, ReactElement, SetStateAction, useCallback, useContext, useState } from "react"
import 'mapbox-gl/dist/mapbox-gl.css'

import Map, { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl"

import { getPublishedRecords } from "@api/business"
import { NextPageWithLayout } from "../_app"
import { AppLayout } from "@layouts/app"
import defaults from "@utils/config"
import strings from "@utils/strings"
import Link from "next/link"
import { BusinessModel } from "@api/business/types"
import { affiliationCategoryConverter, businessCategoryConverter } from "@utils/converters"
import { urlShortener } from "@utils/utils"
import { twMerge } from "tailwind-merge"


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
        <div className="grid grid-cols-4 w-full">
            <BusinessView className="col-span-3" />
            <InfoPanel className="col-span-1" />
        </div>
    ) : (
        <div className="grid grid-cols-4 w-full">
            <BusinessView className="col-span-4" />
        </div>
    )

    return (
        <BusinessViewContext.Provider value={ context }>
            { content }
        </BusinessViewContext.Provider>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    let businesses : Array<BusinessModel> = await getPublishedRecords()

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
                    content: data.website,
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
                  className="h-48"
                  image={ imageSrc }
                  alt={ data.name }
                />
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">{ data.name }</h1>
                        <div className="flex flex-wrap gap-2 flex-row">
                            <Chip className="text-base text-black bg-ukraine-yellow" label={ businessCategoryConverter(data.businessCategory) } />
                            <Chip className="text-base text-black bg-ukraine-yellow" label={ affiliationCategoryConverter(data.affiliation) } />
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
                                                        { urlShortener(content) }
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

    return (
        <Container className={ twMerge('flex-col max-w-full overflow-auto p-0 h-screen', className) }>
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

    const [view, setView] = useState<Views>(Views.Map);

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
        <Container className={ twMerge('flex-col overflow-auto max-h-screen p-0', className) }>
            <ToggleButtonGroup
                value={ view }
                exclusive
                onChange={ handleViewSelection }
                aria-label="views"
                className="absolute top-2 left-2 z-50 bg-slate-50"
            >
                {/* TODO: do we need to add some text to the choices? */}
                <ToggleButton value={ Views.Map } aria-label="map">
                    <IconMap />
                </ToggleButton>
                <ToggleButton value={ Views.Gallery } aria-label="gallery">
                    <IconCollections />
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

    return (
        <BusinessContainer className={ className }>
          {
            businesses.map(
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

    return (
        <div className={ twMerge('w-full h-screen', className) }>
            <Map
                initialViewState={{
                    longitude: selectedBusiness.location?.longitude ?? defaults.businesses.map.longitude,
                    latitude: selectedBusiness.location?.latitude ?? defaults.businesses.map.latitude,
                    zoom: defaults.businesses.map.zoom
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
