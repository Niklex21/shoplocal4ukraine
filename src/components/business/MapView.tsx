import { BusinessCategory, BusinessModel, Tag } from "@api/business/types"
import defaults from "@utils/config"
import { findBusinessById, isEmpty, modelToGeojsonFeature } from "@utils/utils"
import { GeolocateControl, NavigationControl, ScaleControl, Map, MapRef, Source, Layer, SymbolLayer, CircleLayer, GeoJSONSource } from "react-map-gl"
import { ReactNode, Ref, useContext, useEffect, useRef, useState } from "react"
import { BusinessViewContext } from "src/pages/businesses"
import { twMerge } from "tailwind-merge"

import { FeatureCollection, Point } from "geojson"
import { atomCurrentBusiness, atomMapDragState, atomMapStyleState, atomSearchedBusinesses, atomSelectedBusinessID, atomSelectedFromSearch } from "src/atoms/businesses"
import { Layers as IconLayers, SatelliteAlt as IconSatellite, Streetview as IconStreets } from "@mui/icons-material"
import { useAtom } from "jotai"
import { MapDragState, MapStyle } from "@appTypes/businesses"
import { IconButton, Tooltip } from "@mui/material"
import strings from "@utils/strings"
import { isMobile } from "react-device-detect"

/**
 * Stores a map style option to display.
 */
type MapStyleOption = {
    title: string,
    mapStyle: MapStyle,
    icon: ReactNode
}

type Props = {
    className?: string,
    infoPanelOpen: boolean
}

export const MapView = ({ infoPanelOpen, className } : Props) => {

    let { logger } = useContext(BusinessViewContext)
    logger = logger.with({ component: "MapView" })

    const [ businesses ] = useAtom(atomSearchedBusinesses)
    const [ selectedBusiness ] = useAtom(atomCurrentBusiness)

    const [ selectedFromSearch, setSelectedFromSearch ] = useAtom(atomSelectedFromSearch)

    // businesses were filtered, but it's irrelevant for maps (for now)
    // remove all online businesses
    const businessItems : Array<BusinessModel> = businesses.map(b => b.item).filter(b => !b.tags.includes(Tag.OnlineOnly))

    const [ selectedID, setSelectedID ] = useAtom(atomSelectedBusinessID)
    const [ hoverID, setHoverID ] = useState<string>("")

    // stores the current map style (streets/satellite, etc.)
    const [ mapStyleState, setMapStyleState ] = useAtom(atomMapStyleState)
    // tracks whether or not we should be showing the layer options right now
    const [ layersVisibleState, setLayersVisibleState ] = useState<boolean>(false)

    const longitude = selectedBusiness.location?.longitude ?? defaults.businesses.map.longitude
    const latitude = selectedBusiness.location?.latitude ?? defaults.businesses.map.latitude
    const zoom = isEmpty(selectedBusiness) ? defaults.businesses.map.zoom : defaults.businesses.map.businessViewZoom

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
            "icon-image": [
                'case',
                ["==", ['get', 'businessCategory'], BusinessCategory.Crafts],
                defaults.businesses.map.categoryIcon[BusinessCategory.Crafts],
                ["==", ['get', 'businessCategory'], BusinessCategory.Groceries],
                defaults.businesses.map.categoryIcon[BusinessCategory.Groceries],
                ["==", ['get', 'businessCategory'], BusinessCategory.Lifestyle],
                defaults.businesses.map.categoryIcon[BusinessCategory.Lifestyle],
                ["==", ['get', 'businessCategory'], BusinessCategory.Restaurant],
                defaults.businesses.map.categoryIcon[BusinessCategory.Restaurant],
                ["==", ['get', 'businessCategory'], BusinessCategory.Cafe],
                defaults.businesses.map.categoryIcon[BusinessCategory.Cafe],
                ["==", ['get', 'businessCategory'], BusinessCategory.Services],
                defaults.businesses.map.categoryIcon[BusinessCategory.Services],
                ["==", ['get', 'businessCategory'], BusinessCategory.Shopping],
                defaults.businesses.map.categoryIcon[BusinessCategory.Shopping],
                ['==', ['get', 'businessCategory'], BusinessCategory.Product],
                defaults.businesses.map.categoryIcon[BusinessCategory.Product],
                defaults.businesses.map.categoryIcon[BusinessCategory.Shopping]
            ],
            "icon-size": 1.2,
            "text-size": 16,
            "text-font":
                mapStyleState === MapStyle.Streets
                ? ["Open Sans Regular","Arial Unicode MS Regular"]
                : ["Open Sans Bold","Arial Unicode MS Bold"],
            "text-optional": true,
            "visibility": "visible"
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
            "text-halo-blur": 0,
            "text-halo-color": "#FFD700",
            "text-halo-width": 10
        },
    }

    const clusterLayer : CircleLayer = {
        "id": CLUSTERS_LAYER_ID,
        "type": "circle",
        "source": SOURCE_ID,
        "filter": ['has', 'point_count'],
        "paint": {
            //   Blue, 20px circles when point count is less than 10
            //   Yellow, 30px circles when point count is between 10 and 25
            //   Pink, 40px circles when point count is greater than or equal to 25
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                10,
                '#FFD700',
                25,
                '#f28cb1'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                10,
                30,
                25,
                40
            ]
        },
        "layout": {
            "visibility": "visible"
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
            'text-size': 12,
            "visibility": "visible"
        }
    };

    const geojson : FeatureCollection = {
        type: "FeatureCollection",
        features: businessItems.map(b => modelToGeojsonFeature(b))
    }

    const mapStyleOptions : Array<MapStyleOption> = [
        {
            title: strings.businesses.mapView.satellite,
            mapStyle: MapStyle.Satellite,
            icon: ( <IconSatellite />)
        },
        {
            title: strings.businesses.mapView.streets,
            mapStyle: MapStyle.Streets,
            icon: ( <IconStreets />)
        }
    ]

    useEffect(() => {
        if (selectedFromSearch && !isEmpty(selectedBusiness)) {
            // note the current order of the coordinates
            mapRef.current?.flyTo({
                center: [
                    selectedBusiness.location?.longitude ?? defaults.businesses.map.longitude,
                    selectedBusiness.location?.latitude ?? defaults.businesses.map.latitude
                ],
                duration: defaults.businesses.map.transitionDuration,
                zoom: defaults.businesses.map.businessViewZoom
            });
        }
    }, [ selectedBusiness, selectedFromSearch ])

    // update selected text when a new business is selected
    useEffect(() => {
        const map = mapRef.current?.getMap()

        if (map) {
            map?.setFeatureState(
                { source: SOURCE_ID },
                { selected: false }
            )

            map?.setFeatureState(
                { source: SOURCE_ID, id: selectedID },
                { selected: true }
            )
        }

    }, [ selectedID, mapRef ])

    useEffect(() => {
        const map = mapRef.current?.getMap()

        let hoveredBusinessId : string | null = null

        if (map) {
            map.on("load", () => map.resize())

            map.on('click', BUSINESS_LAYER_ID, ({ features }) => {
                if (features && features.length > 0 && features[0]) {
                    setSelectedFromSearch(false)
                    setSelectedID(features[0]?.properties?.id || "")
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
                                logger.debug(`Error while getting cluster expansion zoom: ${ err }`);
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

            map.on('mousemove', CLUSTERS_LAYER_ID, (e) => {
                map.getCanvas().style.cursor = 'pointer'
            })

            map.on('mouseleave', CLUSTERS_LAYER_ID, (e) => {
                map.getCanvas().style.cursor = ''
            })

            map.on('mousemove', BUSINESS_LAYER_ID, (e) => {
                map.getCanvas().style.cursor = 'pointer';
                if (e.features?.length ?? 0 > 0) {
                    if (hoveredBusinessId !== null) {
                        map.setFeatureState(
                            { source: SOURCE_ID, id: hoveredBusinessId ?? undefined },
                            { hover: false }
                        );
                    }
                    hoveredBusinessId = (e.features ? (String(e.features[0].id) ?? null) : null)
                    map.setFeatureState(
                        { source: SOURCE_ID, id: hoveredBusinessId ?? undefined },
                        { hover: true }
                    );
                }
            });

            // When the mouse leaves the business layer, update the feature state of the
            // previously hovered feature.
            map.on('mouseleave', BUSINESS_LAYER_ID, () => {
                map.getCanvas().style.cursor = '';
                if (hoveredBusinessId !== null) {
                    map.setFeatureState(
                        { source: SOURCE_ID, id: hoveredBusinessId ?? undefined },
                        { hover: false }
                    );
                }
                hoveredBusinessId = null;
            });
        }
    })

    return (
        <div className={ twMerge('flex w-full grow safe-h-screen z-0 relative', className) }>
            <Map
                ref={ mapRef as Ref<MapRef>}
                {...viewState}
                onMove={ evt => setViewState(evt.viewState) }
                onDragStart={ () => setDragState(MapDragState.On) }
                onDragEnd={ () => setDragState(MapDragState.Off) }
                style={{ width: '100%', height: isMobile ? 'calc(100% - 5rem)' : "100%" }}
                mapStyle={ defaults.businesses.map.mapStyles[mapStyleState] }
                mapboxAccessToken={ process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN }
                interactiveLayerIds={ [ BUSINESS_LAYER_ID, CLUSTERS_LAYER_ID ] }
                reuseMaps={ true }
            >
                {
                    !isMobile ? (
                        <ScaleControl position="top-right" />
                    ) : (<></>)
                }
                <NavigationControl position={ isMobile ? "bottom-right" : "top-right" } />
                <GeolocateControl trackUserLocation={ true } showUserHeading={ true } position={ isMobile ? "bottom-right" : "top-right" } />

                <Source
                    id={ SOURCE_ID }
                    type="geojson"
                    data={ geojson }
                    generateId={ true }
                    cluster={ true }
                    clusterMaxZoom={14}
                    clusterRadius={50}
                    clusterMinPoints={ 2 }
                >
                    <Layer {...businessesLayer} />
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                </Source>
            </Map>
            <div className={
                twMerge(
                    "fixed right-0 z-40 transition-all duration-200 md:bottom-5 p-5 md:p-0 h-0",
                    selectedBusiness.id ? "bottom-10" : "bottom-0",
                    infoPanelOpen ? "w-full md:w-1/2 lg:w-1/2 xl:w-2/3 2xl:w-3/4" : "w-full"
                )}
            >
                <div className="flex flex-col gap-4 group absolute left-4 bottom-24 md:bottom-4">
                    {
                        mapStyleOptions.map(
                            ({ title, mapStyle, icon }, index: number) => (
                                <Tooltip title={ title } arrow={ true } placement="right" key={ index }>
                                    <IconButton
                                        className={
                                            twMerge(
                                                "ring-current drop-shadow-md ring-0 p-3 transition-all duration-200",
                                                (
                                                    mapStyle === MapStyle.Satellite
                                                    ? "bg-oxford-blue text-white hover:brightness-110 hover:bg-oxford-blue"
                                                    : "bg-white text-oxford-blue hover:brightness-90 hover:bg-white"
                                                ),
                                                "md:hidden md:group-hover:flex",
                                                layersVisibleState ? "flex" : "hidden",
                                                mapStyleState === mapStyle ? (
                                                    mapStyle === MapStyle.Satellite
                                                    ? "text-slate-500 bg-slate-400 hover:bg-slate-400 hover:brightness-100"
                                                    : "text-slate-400 bg-slate-500 hover:bg-slate-500 hover:brightness-100"
                                                ) : ""
                                            )
                                        }
                                        onClick={() => { setMapStyleState(mapStyle); setLayersVisibleState(false) } }
                                    >
                                        { icon }
                                    </IconButton>
                                </Tooltip>
                            )
                        )
                    }
                    <Tooltip title={ strings.businesses.mapView.layers } arrow={ true } placement="right">
                        <IconButton
                            className={
                                twMerge(
                                    mapStyleState === MapStyle.Satellite
                                    ? "bg-white text-oxford-blue group-hover:brightness-90 group-hover:bg-white"
                                    : "bg-oxford-blue group-hover:bg-oxford-blue group-hover:brightness-110 text-white",
                                    "drop-shadow-md p-3 transition-all duration-200"
                                )
                            }
                            onClick={ () => layersVisibleState ? setLayersVisibleState(false) : setLayersVisibleState(true) }
                        >
                            <IconLayers />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}
