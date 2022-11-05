import { Container, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { businessViewConverter } from "@utils/converters";
import { useContext, useState } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import { Views } from "@appTypes/businesses";
import { twMerge } from "tailwind-merge";
import { GalleryView } from "./GalleryView";
import { MapView } from "./MapView";
import { Map as IconMap, Collections as IconCollections } from '@mui/icons-material'
import strings from "@utils/strings";

/**
 * The panel that displays the businesses -- whether it is in a gallery, map,
 * or some other view.
 */
export const BusinessView = ({ className }: any) => {

    const [view, setView] = useState<Views>(Views.Map);
    let { setFilteredBusinesses, fuseSearch, logger } = useContext(BusinessViewContext);

    const bwLogger = logger.with({ component: 'BusinessView' })

    // handles the toggle option selection
    const handleViewSelection = (
        event: React.MouseEvent<HTMLElement>,
        newSelection: Views,
    ) => {
        bwLogger.debug(`New view click: ${ newSelection }`)

        // can't deselect the options, at least one must be selected
        if (newSelection !== null) {
            setView(newSelection);

            bwLogger.info(`New view selection: ${ newSelection }`)
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

    const search = (value: string) => {
        setFilteredBusinesses(fuseSearch.search(value));
    }

    bwLogger.debug(`Loading BusinessView for view: ${ businessViewConverter(view) }`)

    return (
        <Container className={ twMerge(`flex-col overflow-auto h-full max-h-screen max-w-none ${ view === Views.Map ? 'p-0' : '' }`, className) }>
            <div className="absolute top-2 left-16 z-50">
                <div className="flex flex-row gap-4">
                    <ToggleButtonGroup
                        value={ view }
                        exclusive
                        onChange={ handleViewSelection }
                        aria-label="views"
                        className="bg-slate-50 z-0"
                    >
                        <ToggleButton value={ Views.Map } aria-label="map">
                            <IconMap />&nbsp;<span className="uppercase">{ businessViewConverter(Views.Map) }</span>
                        </ToggleButton>
                        <ToggleButton value={ Views.Gallery } aria-label="gallery">
                            <IconCollections />&nbsp;<span className="uppercase">{ businessViewConverter(Views.Gallery) }</span>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {/* the search bar */}
                    <TextField
                        label={ strings.businesses.businessView.searchBarLabel }
                        variant="filled"
                        className="bg-slate-50"
                        onChange={ e => search(e.target.value) } 
                    />
                </div>
            </div>
            <ViewComponent />
        </Container>
    )
}
