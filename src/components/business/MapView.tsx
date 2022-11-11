import { BusinessModel } from "@api/business/types"
import defaults from "@utils/config"
import { findBusinessById, isEmpty, modelToGeojsonFeature } from "@utils/utils"
import { GeolocateControl, NavigationControl, ScaleControl, Map, MapRef, Source, Layer, SymbolLayer } from "react-map-gl"
import { Ref, useContext, useEffect, useRef, useState } from "react"
import { BusinessViewContext } from "src/pages/businesses"
import { twMerge } from "tailwind-merge"

import { FeatureCollection } from "geojson"
import { atomMapDragState, atomSearchedBusinesses, atomSelectedBusinessID } from "src/atoms/businesses"
import { useAtom } from "jotai"
import { MapDragState } from "@appTypes/businesses"

type Props = {
    className?: string
}

export const MapView = ({ className } : Props) => {

    let { logger } = useContext(BusinessViewContext)
    logger = logger.with({ component: "MapView" })

    const [ businesses ] = useAtom(atomSearchedBusinesses)

    // businesses were filtered, but it's irrelevant for maps (for now)
    const businessItems : Array<BusinessModel> = businesses.map(b => b.item)

    const [ selectedID, setSelectedID ] = useAtom(atomSelectedBusinessID)
    const [ hoverID, setHoverID ] = useState<string>("")

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const selectedBusiness : BusinessModel = findBusinessById(businessItems, selectedID)

    const longitude = selectedBusiness.location?.longitude ?? defaults.businesses.map.longitude
    const latitude = selectedBusiness.location?.latitude ?? defaults.businesses.map.latitude
    const zoom = defaults.businesses.map.zoom

    logger.debug(`Loading MapView with default longitude ${ longitude }, latitude ${ latitude }, and zoom ${ zoom }`)

    const [ viewState, setViewState ] = useState({ longitude, latitude, zoom })
    const [ _, setDragState ] = useAtom(atomMapDragState)
    const mapRef = useRef<MapRef>()

    // it's re-used in other places, so should be unified
    const LAYER_ID = 'businesses'

    // Mapbox layer properties (https://visgl.github.io/react-map-gl/docs/api-reference/layer)
    const businessesLayer : SymbolLayer = {
        "id": LAYER_ID,
        "type": "symbol",
        "layout": {
            "text-field": ['get', 'name'],
            "text-justify": "auto",
            "text-variable-anchor": ["left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
            "text-radial-offset": 1,
            "icon-image": 'restaurant',
            "icon-size": 1.2,
            "text-size": 16
        },
        "paint": {
            "text-color": [
                "case",
                ['boolean', ["feature-state", 'selected'], false],
                "#b91c1c",
                ['boolean', ["feature-state", "hover"], false],
                "#0057B8",
                "#000000",
            ],
        },
    }

    const geojson : FeatureCollection = {
        type: "FeatureCollection",
        features: businessItems.map(b => modelToGeojsonFeature(b))
    }

    useEffect(() => {
        if (!isEmpty(selectedBusiness)) {
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

    useEffect(() => {
        const map = mapRef.current?.getMap()

        if (map) {
            map.on('click', LAYER_ID, ({ features }) => {
                if (features && features.length > 0) {
                    map.removeFeatureState(
                        { source: LAYER_ID, id: selectedID }
                    )
                    setSelectedID(features[0]?.properties?.id || "")
                    map.setFeatureState(
                        { source: LAYER_ID, id: selectedID },
                        { "selected": true }
                    )
                }
            })
            map.on('mouseover', LAYER_ID, ({ features }) => {
                map.getCanvas().style.cursor = 'pointer';
                if (features && features.length > 0) {
                    setHoverID(features[0]?.properties?.id || "")
                    map.setFeatureState(
                        { source: LAYER_ID, id: hoverID },
                        { "hover": true }
                    )
                }
            })
            map.on('mouseout', LAYER_ID, ({ features }) => {
                map.getCanvas().style.cursor = '';
                if (features && features.length > 0) {
                    map.removeFeatureState(
                        { source: LAYER_ID, id: hoverID }
                    )
                    setHoverID("")
                }
            })
        }
    })

    return (
        <div className={ twMerge('w-full h-screen', className) }>
            <Map
                ref={ mapRef as Ref<MapRef>}
                {...viewState}
                onMove={ evt => setViewState(evt.viewState) }
                onDragStart={ () => setDragState(MapDragState.On) }
                onDragEnd={ () => setDragState(MapDragState.Off) }
                style={{ width: '100%', height: '100%' }}
                mapStyle={ defaults.businesses.map.mapStyle }
                mapboxAccessToken={ process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN }
                interactiveLayerIds={ [LAYER_ID] }
                reuseMaps={ true }
                >
                    <GeolocateControl />
                    <NavigationControl />
                    <ScaleControl />

                    <Source id={ LAYER_ID } type="geojson" data={ geojson } generateId={ true }>
                        <Layer {...businessesLayer} />
                    </Source>
            </Map>
        </div>
    )
}
