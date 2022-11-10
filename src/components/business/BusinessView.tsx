import { Container, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { businessViewConverter } from "@utils/converters";
import { useContext, useEffect } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import { FilteredBusiness, Views } from "@appTypes/businesses";
import { twMerge } from "tailwind-merge";
import { GalleryView } from "./GalleryView";
import { MapView } from "./MapView";
import { Map as IconMap, Collections as IconCollections } from '@mui/icons-material'
import { useAtom } from "jotai";
import { atomWithHash } from "jotai/utils"

type Props = {
    className?: string,
    businesses: Array<FilteredBusiness>
}

const atomView = atomWithHash('view', Views.Map, { delayInit: true })

/**
 * The panel that displays the businesses -- whether it is in a gallery, map,
 * or some other view.
 */
export const BusinessView = ({ className, businesses }: Props) => {

    const [view, setView] = useAtom(atomView);

    let { logger } = useContext(BusinessViewContext);
    logger = logger.with({ component: 'BusinessView' })

    logger.debug(`Loading BusinessView for view: ${ businessViewConverter(view) }`)

    // handles the toggle option selection
    const handleViewSelection = (
        event: React.MouseEvent<HTMLElement>,
        newSelection: Views,
    ) => {
        // can't deselect the options, at least one must be selected
        if (newSelection !== null) {
            setView(newSelection);

            logger.info(`New view selection: ${ newSelection }`)
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
    })()

    return (
        <Container className={ twMerge(`flex-col overflow-auto h-full max-h-screen max-w-none ${ view === Views.Map ? 'p-0' : '' }`, className) }>
            <ViewComponent businesses={ businesses } />
            <div className="absolute left-2 top-20 z-50 drop-shadow-md">
                <ToggleButtonGroup
                    value={ view }
                    exclusive
                    onChange={ handleViewSelection }
                    aria-label="views"
                    className="bg-slate-50 z-0"
                    orientation="vertical"
                >
                    <ToggleButton value={ Views.Map } aria-label="map">
                        <Tooltip title={ businessViewConverter(Views.Map) } placement="right" >
                            <IconMap />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value={ Views.Gallery } aria-label="gallery">
                        <Tooltip title={ businessViewConverter(Views.Gallery) } placement="right" >
                            <IconCollections />
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </Container>
    )
}
