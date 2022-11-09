import { BusinessModel } from "@api/business/types";
import { useContext } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import BusinessCard from "./BusinessCard";
import Fuse from 'fuse.js';
import { twMerge } from "tailwind-merge";

/**
 * Displays the businesses as a gallery of clickable cards.
 */
export const GalleryView = ({ className }: any) => {

    const { businesses, setSelectedID, selectedID, filteredBusinesses, logger } = useContext(BusinessViewContext);

    logger.with({ component: 'GalleryView' }).debug("Loading GalleryView...")

    // sort by name, alphabetically in ascending order if there are no filtered businesses yet
    // if there are, then choose them instead, sorting them by relevance (score)
    const sortedBusinesses =
        filteredBusinesses.length > 0
        ? filteredBusinesses.sort(
            (a: Fuse.FuseResult<BusinessModel>, b: Fuse.FuseResult<BusinessModel>) => (a.score ?? 0) - (b.score ?? 0)
        ).map(
            (el: Fuse.FuseResult<BusinessModel>) => el.item
        )
        : businesses.sort((a: BusinessModel, b: BusinessModel) => a.name.localeCompare(b.name))

    return (
        <div className={ twMerge('flex flex-row flex-wrap gap-6 my-20 md:mx-auto px-1 md:px-12 justify-center md:justify-start', className) }>
          {
            sortedBusinesses.map(
                (data: BusinessModel) => (
                    <div className="cursor-pointer" key={ data.id } id={ data.id } onClick={ () => { setSelectedID(data.id)} }>
                        <BusinessCard
                            data={ data }
                            active={ data.id === selectedID }
                        />
                    </div>
                )
            )
          }
        </div>
    )
}
