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

/**
 * Defines whether or not the map is being moved.
 * - On  : map is being dragged at the moment
 * - Off : map is static at the moment
 */
enum MapDragState {
    On,
    Off
}

type FilteredBusiness = Fuse.FuseResult<BusinessModel>

/**
 * Extends {@link BusinessModel} by adding dedicated serialized string fields
 * for all the types that are not initially serialized.
 */
type SerializedBusinessModel = BusinessModel & {
    serializedBusinessCategory: string,
    serializedTags: Array<string>
}

/**
 * Type alias for a search result on an array of {@link SerializedBusinessModel}.
 */
type SearchedSerializedBusiness = Fuse.FuseResult<SerializedBusinessModel>

export type { ContactsRow, BusinessViewContextData, FilteredBusiness, SerializedBusinessModel, SearchedSerializedBusiness }
export { Views, MapDragState }
