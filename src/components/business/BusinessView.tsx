import { Button, Container, Fab, IconButton, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { businessViewConverter } from "@utils/converters";
import { ReactNode, useContext } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import { PanelState, Views } from "@appTypes/businesses";
import { twMerge } from "tailwind-merge";
import { GalleryView } from "./GalleryView";
import { MapView } from "./MapView";
import { Map as IconMap, Collections as IconCollections, Add as IconAdd, HdrStrongSharp, Menu as IconMenu } from '@mui/icons-material'
import { useAtom } from "jotai";
import { atomCurrentBusiness, atomView } from "src/atoms/businesses";
import strings from "@utils/strings"
import { isEmpty } from "@utils/utils";
import { isMobile } from "react-device-detect";
import { atomGlobalMenuState } from "src/atoms/global";

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
    const [ menuState, setMenuState ] = useAtom(atomGlobalMenuState)

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

    return (
        <div className={ twMerge(`relative w-full flex flex-col overflow-auto h-full max-h-screen max-w-none p-0`, className) }>
            <ViewComponent infoPanelOpen={ infoPanelOpen } />
            {/* TODO: this should move based on the infopanel state, but so far I haven't been able to come up with an elegant solution */}
            <div className={
                twMerge(
                    "fixed right-0 z-40 transition-all duration-200 bottom-0 p-5 md:p-0 h-20 md:h-0 bg-ukraine-blue md:bg-transparent ",
                    "w-full"
                )}
            >
                {/* MOBILE MENU */}
                <div
                    className={ `md:hidden absolute bottom-4 left-0 translate-x-1/2 z-10 p-1 bg-white rounded-full drop-shadow-md` }
                    onClick={ () => setMenuState(PanelState.Open) }
                >
                    {/* the hover effect disables inner MUI hover circle bg */}
                    <IconButton
                        className={ "text-ukraine-blue text-3xl cursor-pointer hover:bg-inherit" }
                    >
                        <IconMenu />
                    </IconButton>
                </div>
                {/* UNIVERSAL */}
                <Button
                    className="absolute left-1/2 bottom-4 focus:bg-white md:focus:bg-ukraine-blue -translate-x-1/2 z-40 drop-shadow-md rounded-full bg-white md:bg-ukraine-blue text-ukraine-blue md:text-white normal-case font-bold py-3 px-4"
                    onClick={ toggleViewSelection }
                    variant="contained"
                >
                    { strings.businesses.businessView.show }
                    &nbsp;
                    { alternativeViewName }
                    &nbsp;
                    { alternativeViewIcon }
                </Button>
                <Tooltip title={ "Coming soon!" }>
                    <Fab
                        className="absolute right-0 bottom-4 -translate-x-1/2 h-12 w-12 bg-white md:bg-ukraine-blue text-ukraine-blue md:text-white hover:brightness-110"
                    >
                        <IconAdd />
                    </Fab>  
                </Tooltip>
            </div>
            { children }
        </div>
    )
}
