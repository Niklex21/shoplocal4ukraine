import { BusinessModel } from "@api/business/types";
import { Dispatch, SetStateAction } from "react";
import Fuse from 'fuse.js';
import { Logger } from "next-axiom";

/**
 * Contains an icon, content, link structure to define a list of contacts to be rendered later
 */
type ContactsRow = {
    icon: JSX.Element,
    content: string,
    link: string
}

/**
 * Defines the available types of business views.
 */
enum Views {
    Gallery,
    Map
}

/**
 * The type of the context data.
 */
type BusinessViewContextData = {
    selectedID: string,
    businesses: Array<BusinessModel>,
    setSelectedID: Dispatch<SetStateAction<string>>,
    fuseSearch: Fuse<BusinessModel>,
    setFilteredBusinesses: Dispatch<SetStateAction<Array<Fuse.FuseResult<BusinessModel>>>>,
    filteredBusinesses: Fuse.FuseResult<BusinessModel>[],
    logger: Logger
};

// defines whether or not the map is being moved (on -- dragged right now)
enum MapDragState {
    On,
    Off
}

export type { ContactsRow, BusinessViewContextData }
export { Views, MapDragState }
