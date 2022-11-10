import { BusinessModel } from "@api/business/types";
import { MapDragState } from "@appTypes/businesses";
import { atom } from "jotai";
import Fuse from "fuse.js"
import { atomWithHash } from "jotai/utils";

// stores whether or not the map is being moved right now
const atomMapDragState = atom<MapDragState>(MapDragState.Off)

// stores the currently selected business ID
// delayInit has to be true to avoid problems with hydration (https://github.com/pmndrs/jotai/issues/739#issuecomment-929260696)
const atomSelectedBusinessID = atomWithHash<string>("business_id", "", { delayInit: true })

// stores the current filtered list of businesses
const atomFilteredBusinesses = atom<Array<Fuse.FuseResult<BusinessModel>>>([])

// stores the current search query in the search bar in the main businesses view
const atomSearchQuery = atomWithHash<string>("search", "", { delayInit: true })

export { atomMapDragState, atomSelectedBusinessID, atomFilteredBusinesses, atomSearchQuery }
