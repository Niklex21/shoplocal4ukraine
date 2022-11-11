import { PanelState } from "@appTypes/businesses";
import { atom } from "jotai";

const menuStateAtom = atom<PanelState>(PanelState.Closed)

export { menuStateAtom }
