import { PanelState } from "@appTypes/businesses";
import { atom } from "jotai";

/**
 * Stores the state of the menu panel.
 */
const menuStateAtom = atom<PanelState>(PanelState.Closed)

export { menuStateAtom }
