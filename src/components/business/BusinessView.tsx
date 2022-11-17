import { Button, Container, Fab, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { businessViewConverter } from "@utils/converters";
import { useContext } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import { Views } from "@appTypes/businesses";
import { twMerge } from "tailwind-merge";
import { GalleryView } from "./GalleryView";
import { MapView } from "./MapView";
import { Map as IconMap, Collections as IconCollections, Add as IconAdd, HdrStrongSharp } from '@mui/icons-material'
import { useAtom } from "jotai";
import { atomCurrentBusiness, atomView } from "src/atoms/businesses";
import strings from "@utils/strings"
import { isEmpty } from "@utils/utils";

type Props = {
    className?: string
}

/**
 * The panel that displays the businesses -- whether it is in a gallery, map,
 * or some other view.
 */
export const BusinessView = ({ className }: Props) => {

    const [view, setView] = useAtom(atomView);
    const [ selectedBusiness ] = useAtom(atomCurrentBusiness)

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
        <Container className={ twMerge(`flex-col overflow-auto h-full max-h-screen max-w-none ${ view === Views.Map ? 'p-0' : '' }`, className) }>
            <ViewComponent />
            <div className={
                twMerge(
                    "fixed left-0 z-40 bottom-5",
                    isEmpty(selectedBusiness) ? "w-full" : "w-3/4"
                )}
            >
                <Button
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 z-40 drop-shadow-md rounded-full bg-ukraine-blue text-white normal-case font-bold py-3 px-4"
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
                        className="absolute right-0 bottom-0 -translate-x-1/2 bg-ukraine-blue text-white hover:bg-ukraine-blue hover:brightness-110"
                    >
                        <IconAdd />
                    </Fab>  
                </Tooltip>
            </div>
        </Container>
    )
}
