import { Button, IconButton, Tooltip } from "@mui/material";
import { businessViewConverter } from "@utils/converters";
import { ReactNode, useContext, useState } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import { MapStyle, PanelState, Views } from "@appTypes/businesses";
import { twMerge } from "tailwind-merge";
import { GalleryView } from "./GalleryView";
import { MapView } from "./MapView";
import { Map as IconMap, Collections as IconCollections, Add as IconAdd, Menu as IconMenu } from '@mui/icons-material'
import { useAtom } from "jotai";
import { atomCurrentBusiness, atomMapStyleState, atomView } from "src/atoms/businesses";
import strings from "@utils/strings"
import { toast } from "react-toastify";
import { atomWithStorage } from "jotai/utils";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { AppMenu } from "@components/common/AppMenu";

/**
 * Tracks whether or not it's the first time the user visits this page.
 */
const atomFirstTimeVisitor = atomWithStorage<boolean>('firstTime', true)

/**
 * infoPanelOpen: opening a side panel results in a layout shift so we have to take that into account
 */
type Props = {
    infoPanelOpen?: boolean,
    className?: string,
    children?: ReactNode
}

/**
 * The panel that displays the businesses -- whether it is in a gallery, map,
 * or some other view.
 */
export const BusinessView = ({ infoPanelOpen, className, children }: Props) => {

    const [view, setView] = useAtom(atomView);
    const [ selectedBusiness ] = useAtom(atomCurrentBusiness)

    const [ mapStyleState ] = useAtom(atomMapStyleState)

    const [ menuState, setMenuState ] = useState<PanelState>(PanelState.Closed)

    let { logger } = useContext(BusinessViewContext);
    logger = logger.with({ component: 'BusinessView' })

    logger.debug(`Loading BusinessView for view: ${ businessViewConverter(view) }`)

    // the current view name to display on the button -- easier than using a state
    const alternativeViewName = view === Views.Map 
        ? strings.businesses.businessView.titleViewGallery
        : strings.businesses.businessView.titleViewMap

    const alternativeViewIcon = view === Views.Map
        ? <IconCollections />
        : <IconMap />

    const toggleViewSelection = () => {
        const newSelection : Views = view === Views.Map ? Views.Gallery : Views.Map
        setView(newSelection)
        logger.info(`New view selection: ${ newSelection }`)
    }

    // the view component that actually contains the businesses display
    const ViewComponent = (() => {
        switch(view) {
            case Views.Gallery:
                return GalleryView;
            case Views.Map:
                return MapView;
        }
    })()

    const [ isFirstTime, setIsFirstTime ] = useAtom(atomFirstTimeVisitor)
    if (isFirstTime) {
        toast.info(strings.businesses.tipOnlyOnline, {
            autoClose: false,
            position: "bottom-left"
        })

        setIsFirstTime(false)
    }

    const filterBar = (
        <div className={ twMerge("fixed top-4 z-30 ml-4", infoPanelOpen ? "left-4 md:left-1/2 xl:left-1/3 2xl:left-1/4" : "left-0 md:left-24") }>
            <SearchBar  />
        </div>
    )

    const menu = (
        <IconButton className="fixed top-4 z-30 left-4 w-12 h-12 rounded-md bg-white hover:bg-white hover:brightness-95" onClick={ () => setMenuState(PanelState.Open) }>
            <IconMenu className="text-oxford-blue" />
        </IconButton>
    )

    return (
        <>
            <div className={ twMerge(`relative w-full flex flex-col overflow-auto h-full max-h-screen max-w-none p-0 transition-all duration-200`, className) }>
                { menu }
                { filterBar }
                <ViewComponent infoPanelOpen={ infoPanelOpen ?? false } className="self-end" />
                {/* TODO: this should move based on the infopanel state, but so far I haven't been able to come up with an elegant solution */}
                <div className={
                    twMerge(
                        "fixed right-0 z-40 transition-all duration-200 md:bottom-5 p-5 md:p-0 h-0",
                        selectedBusiness.id ? "bottom-10" : "bottom-0",
                        infoPanelOpen ? "w-full md:w-1/2 lg:w-1/2 xl:w-2/3 2xl:w-3/4" : "w-full"
                    )}
                >
                    <Button
                        className={
                            twMerge(
                                mapStyleState === MapStyle.Streets || view === Views.Gallery
                                ? "hover:bg-oxford-blue hover:brightness-110 bg-oxford-blue text-white"
                                : "hover:bg-white hover:brightness-90 bg-white text-oxford-blue",
                                "absolute left-1/2 bottom-4 -translate-x-1/2 z-40 drop-shadow-md rounded-full normal-case font-bold py-3 px-4"
                            )
                        }
                        onClick={ toggleViewSelection }
                        variant="contained"
                    >
                        { strings.businesses.businessView.show }
                        &nbsp;
                        { alternativeViewName }
                        &nbsp;
                        { alternativeViewIcon }
                    </Button>
                    <div className="flex absolute bottom-4 right-10">
                        <Tooltip title={ strings.businesses.businessView.tooltipAddBusiness } arrow={ true } placement="left">
                            <Link href="/join" target="_blank">
                                <IconButton
                                    className={
                                        twMerge(
                                            mapStyleState === MapStyle.Streets || view === Views.Gallery
                                            ? "hover:bg-oxford-blue hover:brightness-110 bg-oxford-blue text-white"
                                            : "hover:bg-white hover:brightness-90 bg-white text-oxford-blue",
                                            "drop-shadow-md p-3 transition-all duration-200"
                                        )
                                    }
                                >
                                    <IconAdd />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </div>
                </div>
                { children }
            </div>
            <AppMenu menuState={ menuState } setMenuState={ setMenuState } />
        </>
    )
}
