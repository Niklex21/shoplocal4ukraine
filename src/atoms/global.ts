import { DarkModeOptions } from "@appTypes/common";
import { LOCAL_STORAGE_KEYS } from "@utils/config";
import { atomWithStorage } from "jotai/utils";

const atomDarkMode = atomWithStorage<DarkModeOptions>(LOCAL_STORAGE_KEYS.atomDarkMode, DarkModeOptions.Light)

export { atomDarkMode }