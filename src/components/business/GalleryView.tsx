import { BusinessModel } from "@api/business/types";
import { useContext } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import BusinessCard from "./BusinessCard";
import { twMerge } from "tailwind-merge";
import { atomSearchedBusinesses, atomSelectedBusinessID } from "src/atoms/businesses";
import { useAtom } from "jotai";
import { SearchedSerializedBusiness } from "@appTypes/businesses";
import strings from "@utils/strings";

/**
 * infoPanelOpen: opening a side panel results in a layout shift, so we have to take that into account.
 */
type Props = {
    infoPanelOpen?: boolean,
    className?: string
}

/**
 * Displays the businesses as a gallery of clickable cards.
 */
export const GalleryView = ({ infoPanelOpen, className }: Props) => {

    let { logger } = useContext(BusinessViewContext);
    const [ selectedID, setSelectedID ] = useAtom(atomSelectedBusinessID)
    const [ businesses ] = useAtom(atomSearchedBusinesses)

    logger = logger.with({ component: 'GalleryView' })
    logger.debug("Loading GalleryView...")

    // sort by name, alphabetically in ascending order if there are no filtered businesses yet
    // if there are, then choose them instead, sorting them by relevance (score)
    const sortedBusinesses = businesses.sort(
        (a: SearchedSerializedBusiness, b: SearchedSerializedBusiness) => (a.score ?? 0) - (b.score ?? 0) || a.item.name.localeCompare(b.item.name)
    )
    
    const gridBreakpoints = 
        infoPanelOpen 
        ? "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"

    const panelWidth =
        infoPanelOpen
        ? "w-full md:w-3/4"
        : "w-full"

    return (
        <div className={ twMerge(`flex flex-wrap flex-col md:grid ${ gridBreakpoints } ${ panelWidth } gap-8 md:gap-x-10 md:gap-y-10 py-20 px-6 md:px-14 justify-center`, className) }>
          {
            sortedBusinesses.length === 0
            ? (<text className="text-lg italic">{ strings.businesses.noBusinessesFound }</text>)
            : sortedBusinesses.map(
                ({ item }: { item: BusinessModel }) => (
                    <div className="flex cursor-pointer" key={ item.id } id={ item.id } onClick={ () => setSelectedID(item.id) }>
                        <BusinessCard
                            data={ item }
                            active={ item.id === selectedID }
                        />
                    </div>
                )
            )
          }
        </div>
    )
}
