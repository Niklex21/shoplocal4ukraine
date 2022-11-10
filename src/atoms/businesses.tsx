import { BusinessModel } from "@api/business/types";
import { MapDragState } from "@appTypes/businesses";
import { atom } from "jotai";
import Fuse from "fuse.js"

// stores whether or not the map is being moved right now
const atomMapDragState = atom<MapDragState>(MapDragState.Off)

// stores the currently selected business ID
const atomSelectedBusinessID = atom<string>("")

// stores the current filtered list of businesses
const atomFilteredBusinesses = atom<Array<Fuse.FuseResult<BusinessModel>>>([])

export { atomMapDragState, atomSelectedBusinessID, atomFilteredBusinesses }
