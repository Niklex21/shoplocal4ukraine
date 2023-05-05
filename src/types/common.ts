import { Link as LinkType } from "@appTypes/landing";

type Section = {
    name: string,
    links: Array<LinkType>
}

enum DarkModeOptions {
    Dark,
    Light,
    System
}

export type { Section }
export { DarkModeOptions }
