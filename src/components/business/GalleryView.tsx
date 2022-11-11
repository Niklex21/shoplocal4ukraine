import { BusinessModel } from "@api/business/types";
import { useContext } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import BusinessCard from "./BusinessCard";
import { twMerge } from "tailwind-merge";
import { atomSearchedBusinesses, atomSelectedBusinessID } from "src/atoms/businesses";
import { useAtom } from "jotai";
import { SearchedSerializedBusiness } from "@appTypes/businesses";
import strings from "@utils/strings";

type Props = {
    className?: string
}

/**
 * Displays the businesses as a gallery of clickable cards.
 */
export const GalleryView = ({ className }: Props) => {

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

    return (
        <div className={ twMerge('flex flex-row flex-wrap gap-6 my-20 md:mx-auto px-1 md:px-12 justify-center md:justify-start', className) }>
          {
            sortedBusinesses.length === 0
            ? (<text className="text-lg italic">{ strings.businesses.galleryView.noBusinessesFound }</text>)
            : sortedBusinesses.map(
                ({ item }: { item: BusinessModel }) => (
                    <div className="cursor-pointer" key={ item.id } id={ item.id } onClick={ () => setSelectedID(item.id) }>
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
