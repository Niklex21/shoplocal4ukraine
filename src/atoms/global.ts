import { PanelState } from "@appTypes/businesses"
import { atom } from "jotai"

const atomGlobalMenuState = atom<PanelState>(PanelState.Closed)

export { atomGlobalMenuState }