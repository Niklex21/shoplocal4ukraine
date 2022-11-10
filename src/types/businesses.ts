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
    Map,
    Gallery
}

/**
 * The type of the context data.
 */
type BusinessViewContextData = {
    logger: Logger
};

// defines whether or not the map is being moved (on -- dragged right now)
enum MapDragState {
    On,
    Off
}

type FilteredBusiness = Fuse.FuseResult<BusinessModel>

export type { ContactsRow, BusinessViewContextData, FilteredBusiness }
export { Views, MapDragState }
