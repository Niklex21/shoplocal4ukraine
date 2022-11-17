import { BusinessModel } from "@api/business/types"
import defaults from "@utils/config"
import { findBusinessById, isEmpty, modelToGeojsonFeature } from "@utils/utils"
import { GeolocateControl, NavigationControl, ScaleControl, Map, MapRef, Source, Layer, SymbolLayer, CircleLayer, GeoJSONSource } from "react-map-gl"
import { Ref, useContext, useEffect, useRef, useState } from "react"
import { BusinessViewContext } from "src/pages/businesses"
import { twMerge } from "tailwind-merge"

import { FeatureCollection, Point } from "geojson"
import { atomCurrentBusiness, atomMapDragState, atomSearchedBusinesses, atomSelectedBusinessID } from "src/atoms/businesses"
import { useAtom } from "jotai"
import { MapDragState } from "@appTypes/businesses"

type Props = {
    className?: string
}

export const MapView = ({ className } : Props) => {

    let { logger } = useContext(BusinessViewContext)
    logger = logger.with({ component: "MapView" })

    const [ businesses ] = useAtom(atomSearchedBusinesses)
    const [ selectedBusiness ] = useAtom(atomCurrentBusiness)

    // businesses were filtered, but it's irrelevant for maps (for now)
    const businessItems : Array<BusinessModel> = businesses.map(b => b.item)

    const [ selectedID, setSelectedID ] = useAtom(atomSelectedBusinessID)
    const [ hoverID, setHoverID ] = useState<string>("")
    
    const longitude = selectedBusiness.location?.longitude ?? defaults.businesses.map.longitude
    const latitude = selectedBusiness.location?.latitude ?? defaults.businesses.map.latitude
    const zoom = isEmpty(selectedBusiness) ? defaults.businesses.map.zoom : defaults.businesses.map.businessViewZoom

    logger.debug(`Loading MapView with default longitude ${ longitude }, latitude ${ latitude }, and zoom ${ zoom }`)

    const [ viewState, setViewState ] = useState({ longitude, latitude, zoom })
    const [ _, setDragState ] = useAtom(atomMapDragState)
    const mapRef = useRef<MapRef>()

    // it's re-used in other places, so should be unified
    const BUSINESS_LAYER_ID = 'businesses'
    const CLUSTERS_LAYER_ID = 'clusters'
    const CLUSTER_COUNT_LAYER_ID = 'cluster-count'
    const SOURCE_ID = 'map'

    // Mapbox layer properties (https://visgl.github.io/react-map-gl/docs/api-reference/layer)
    const businessesLayer : SymbolLayer = {
        "id": BUSINESS_LAYER_ID,
        "type": "symbol",
        "source": SOURCE_ID,
        "filter": ['!', ['has', 'point_count']],
        "layout": {
            "text-field": ['get', 'name'],
            "text-justify": "auto",
            "text-variable-anchor": ["left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
            "text-radial-offset": 1,
            "icon-image": 'restaurant',
            "icon-size": 1.2,
            "text-size": 16,
            "text-optional": true,
            "icon-allow-overlap": true
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

    const clusterLayer : CircleLayer = {
        "id": CLUSTERS_LAYER_ID,
        "type": "circle",
        "source": SOURCE_ID,
        "filter": ['has', 'point_count'],
        "paint": {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#f1f075',
                750,
                '#f28cb1'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ]
        }
    }

    const clusterCountLayer : SymbolLayer = {
        id: CLUSTER_COUNT_LAYER_ID,
        type: 'symbol',
        source: SOURCE_ID,
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    };

    const geojson : FeatureCollection = {
        type: "FeatureCollection",
        features: businessItems.map(b => modelToGeojsonFeature(b))
    }

    useEffect(() => {
        if (!isEmpty(selectedBusiness)) {
            // note the current order of the coordinates
            mapRef.current?.flyTo({
                zoom: defaults.businesses.map.businessViewZoom,
                center: [
                    selectedBusiness.location?.longitude ?? defaults.businesses.map.longitude,
                    selectedBusiness.location?.latitude ?? defaults.businesses.map.latitude
                ],
                duration: defaults.businesses.map.transitionDuration
            });
        }
    }, [ selectedBusiness ])

    useEffect(() => {
        const map = mapRef.current?.getMap()

        if (map) {
            map.on('click', BUSINESS_LAYER_ID, ({ features }) => {
                if (features && features.length > 0) {
                    map.removeFeatureState(
                        { source: SOURCE_ID, id: selectedID }
                    )
                    setSelectedID(features[0]?.properties?.id || "")
                    map.setFeatureState(
                        { source: SOURCE_ID, id: selectedID },
                        { "selected": true }
                    )
                }
            })
            map.on('click', CLUSTERS_LAYER_ID, (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: [CLUSTERS_LAYER_ID]
                });

                const clusterId = features[0].properties?.cluster_id;
                if (features && features.length > 0) {
                    (map.getSource(SOURCE_ID) as GeoJSONSource).getClusterExpansionZoom(
                        clusterId,
                        (err, zoom) => {
                            if (err) {
                                logger.debug("Error while getting cluster expansion zoom: ", err);
                                return;
                            }

                            // note that we have to do the coordinates[0], coordinates[1]
                            // as Position may have 3 items, and center can only accept two
                            let coordinates = (features[0].geometry as Point).coordinates
                            map.easeTo({
                                center: [coordinates[0], coordinates[1]],
                                zoom: zoom
                            })
                        }
                    )
                }
            })
            map.on('mouseover', CLUSTERS_LAYER_ID, (e) => {
                map.getCanvas().style.cursor = 'pointer'
            })
            map.on('mouseover', BUSINESS_LAYER_ID, ({ features }) => {
                map.getCanvas().style.cursor = 'pointer';
                if (features && features.length > 0) {
                    setHoverID(features[0]?.properties?.id || "")
                    map.setFeatureState(
                        { source: SOURCE_ID, id: hoverID },
                        { "hover": true }
                    )
                }
            })
            map.on('mouseout', BUSINESS_LAYER_ID, ({ features }) => {
                map.getCanvas().style.cursor = '';
                if (features && features.length > 0) {
                    map.removeFeatureState(
                        { source: SOURCE_ID, id: hoverID }
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
                interactiveLayerIds={ [ BUSINESS_LAYER_ID, CLUSTERS_LAYER_ID ] }
                reuseMaps={ true }
                >
                    <GeolocateControl />
                    <NavigationControl />
                    <ScaleControl />

                    <Source id={ SOURCE_ID } type="geojson" data={ geojson } generateId={ true } cluster={ true } clusterMaxZoom={14} clusterRadius={50}>
                        <Layer {...businessesLayer} />
                        <Layer {...clusterLayer} />
                        <Layer {...clusterCountLayer} />
                    </Source>
            </Map>
        </div>
    )
}
