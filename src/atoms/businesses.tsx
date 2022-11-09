import { MapDragState } from "@appTypes/businesses";
import { atom } from "jotai";

const atomMapDragState = atom(MapDragState.Off)

export { atomMapDragState }