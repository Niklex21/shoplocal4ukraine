import { BusinessModel } from "@api/business/types"
import defaults from "@utils/config"
import { findBusinessById } from "@utils/utils"
import { GeolocateControl, NavigationControl, ScaleControl, Map, MapRef } from "react-map-gl"
import { useContext, useEffect, useRef, useState } from "react"
import { BusinessViewContext } from "src/pages/businesses"
import { twMerge } from "tailwind-merge"
import Fuse from 'fuse.js'

import BusinessMapMarker from "./MapMarker"

export const MapView = ({ className } : any) => {

    const { businesses, setSelectedID, selectedID, filteredBusinesses, logger } = useContext(BusinessViewContext)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const selectedBusiness : BusinessModel =
        selectedID === ""
        ? {} as BusinessModel
        : findBusinessById(businesses, selectedID)

    const currentBusinesses =
        filteredBusinesses.length > 0
        ? filteredBusinesses.map((el: Fuse.FuseResult<BusinessModel>) => el.item)
        : businesses

    const longitude = selectedBusiness.location?.longitude ?? defaults.businesses.map.longitude
    const latitude = selectedBusiness.location?.latitude ?? defaults.businesses.map.latitude
    const zoom = defaults.businesses.map.zoom

    const [ viewState, setViewState ] = useState({ longitude, latitude, zoom })
    const mapRef = useRef<MapRef>()

    useEffect(() => {
        if (Object.keys(selectedBusiness).length > 0) {
            setViewState({
                longitude: selectedBusiness.location.longitude,
                latitude: selectedBusiness.location.latitude,
                zoom: defaults.businesses.map.businessViewZoom
            })
            mapRef.current?.flyTo({ 
                zoom: defaults.businesses.map.businessViewZoom,
                center: [selectedBusiness.location.longitude, selectedBusiness.location.latitude],
                duration: defaults.businesses.map.transitionDuration
            });
        }
    }, [ setViewState, selectedBusiness ])

    logger.with({ component: 'MapView' }).debug(`Loading MapView with default longitude ${ longitude }, latitude ${ latitude }, and zoom ${ zoom }`)

    return (
        <div className={ twMerge('w-full h-screen', className) }>
            <Map
                ref={ mapRef }
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={ process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN }
                >
                    <GeolocateControl />
                    <NavigationControl />
                    <ScaleControl />

                    {/* markers */}
                    {
                        currentBusinesses.map(
                            (data: BusinessModel, index: number) => (
                                <BusinessMapMarker
                                    key={ index }
                                    onClickEventHandler={ () => { setSelectedID(data.id)} }
                                    data={ data }
                                    active={ selectedID === data.id }
                                />
                            )
                        )
                    }
            </Map>
        </div>
    )
}
