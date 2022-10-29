import { BusinessModel } from "@api/business/types";
import { useContext } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import BusinessCard from "./BusinessCard";
import BusinessContainer from "./BusinessContainer";
import Fuse from 'fuse.js';

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
        <BusinessContainer className={ className }>
          {
            sortedBusinesses.map(
                (data: BusinessModel) => (
                    <div className="cursor-pointer" key={ data.id } onClick={ () => { setSelectedID(data.id)} }>
                        <BusinessCard
                            data={ data }
                            active={ data.id === selectedID }
                        />
                    </div>
                )
            )
          }
        </BusinessContainer>
    )
}
