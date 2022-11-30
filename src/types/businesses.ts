import { BusinessModel } from "@api/business/types";
import Fuse from 'fuse.js';
import { Logger } from "next-axiom";

/**
 * Defines a generic icon, link, text structure for parsing icon buttons.
 */
type IconLinkText = {
    icon?: JSX.Element,
    link?: string,
    text?: string
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

/**
 * Defines a state of a generic panel -- either closed or open. Can be extended as needed.
 */
enum PanelState {
    Closed,
    Open
}

/**
 * Defines the possible positions of a generic full-screen panel -- attached to the left/right/top/bottom edge or in the screen center.
 */
enum FullScreenPanelPosition {
    Left,
    Right,
    Center,
    Top,
    Bottom
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

export type { IconLinkText, BusinessViewContextData, FilteredBusiness, SerializedBusinessModel, SearchedSerializedBusiness }
export { Views, MapDragState, PanelState, FullScreenPanelPosition }
