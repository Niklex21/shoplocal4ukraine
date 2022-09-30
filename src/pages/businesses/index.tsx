import { BusinessCard, BusinessContainer, BusinessMapMarker } from "@components/business"
import { Container } from "@components/common"
import { Collections as IconCollections, Map as IconMap, Place as IconPlace, Email as IconEmail, Link as IconLink, Phone as IconPhone } from "@mui/icons-material"
import { Card, CardContent, CardMedia, Chip, SvgIconTypeMap, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useMemo, useState } from "react"
import 'mapbox-gl/dist/mapbox-gl.css'

import Map from "react-map-gl"

import { getPublishedRecords } from "@api/business"
import { NextPageWithLayout } from "../_app"
import { AppLayout } from "@layouts/app"
import defaults from "@utils/config"
import strings from "@utils/strings"
import Link from "next/link"
import { OverridableComponent } from "@mui/material/OverridableComponent"


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
        <div className="grid grid-cols-4 w-full">
            <BusinessViewContext.Provider value={ context }>
                <BusinessView className="col-span-3" />
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
 * Contains an icon & content structure to define a list of content to be rendered later
 */
type ContactsRow = {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
    content: JSX.Element
}

/**
 * The info panel on the right that displays the details of the selected business.
 */
const InfoPanel = ({ className }: any) => {

    const { businesses, selectedID } = useContext(BusinessViewContext)

    const data = selectedID < 0 ? null : businesses[selectedID].fields
    const imageSrc = data !== null ? data['Image'][0]['url'] : defaults.businesses.gallery.defaultImage.src

    const contacts : Array<ContactsRow> = data === null ? [] : [
        {
            icon: IconPlace,
            content: (
                <Link href={ data['Address'] }>{ data['City/town'] }</Link>
            )
        },
        ...[
            ('Website (Optional)' in data) ? {
                icon: IconLink,
                content: (
                    <Link href={ data['Website (Optional)'] }>{ data['Website (Optional)'] }</Link>
                )
            } : {} as ContactsRow
        ],
        ...[
            ('Email (optional)' in data) ? {
                icon: IconEmail,
                content: (
                    <Link href={`mailto:${ data['Email (optional)'] }`}>{ data['Email (optional)'] }</Link>
                )
            } : {} as ContactsRow
        ],
        ...[
            ('Phone number (optional)' in data) ? {
                icon: IconPhone,
                content: (
                    <Link href={`tel:${ data['Phone number (optional)'] }`}>{ data['Phone number (optional)'] }</Link>
                )
            } : {} as ContactsRow
        ]
    ]

    const Info = 
        data === null
        ? (<>{ strings.businesses.info.noBusinessSelected }</>)
        : (
            <Card className="overflow-auto h-full w-full">
                <CardMedia 
                  component="img"
                  className="h-48"
                  image={ imageSrc }
                  alt={ data['Name'] }
                />
                <CardContent>
                    <h1 className="text-2xl font-bold">{ data['Name'] }</h1>
                    <div className="mt-3 flex flex-wrap gap-2 flex-row font-semibold">
                    <Chip className="bg-ukraine-yellow text-base" label={ data['Affiliation Type'] } />
                    <Chip className="bg-ukraine-yellow text-base" label={ data['Business category'] } />
                    </div>
                    <h3 className="mt-3 prose font-semibold">{ strings.businesses.info.sectionTitle.contacts }</h3>
                    {
                        contacts.map(
                            ({ icon, content } : { icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }, content: JSX.Element }, index: number) => (
                                <div className="flex flex-nowrap gap-2 flex-row" key={ index }>
                                    { content }
                                </div>
                            )
                        )
                    }
                    <h3 className="mt-3 prose font-semibold">{ strings.businesses.info.sectionTitle.description }</h3>
                    <span className="prose break-words opacity-80">{ data['Description'] }</span>
                </CardContent>
            </Card>
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
                longitude: selectedBusiness !== null ? selectedBusiness['Longitude'] : defaults.businesses.map.longitude,
                latitude: selectedBusiness !== null ? selectedBusiness['Latitude'] : defaults.businesses.map.latitude,
                zoom: defaults.businesses.map.zoom
            }}
            style={{width: '100%', height: '100vh' }}
            mapStyle="mapbox://styles/mapbox/streets-v9" 
            mapboxAccessToken={ process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN }
            >
                {
                    businesses.map(
                        ({ fields } : { fields: Object }, index: number) => (
                            <BusinessMapMarker 
                                key={ index }
                                onClickEventHandler={ () => { setSelectedID(index)} }
                                fields={ fields }
                                active={ selectedID === index } 
                            />
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
