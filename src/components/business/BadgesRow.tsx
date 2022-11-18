import { Tag } from "@api/business/types";
import { LoyaltyTwoTone as IconLoyalty } from "@mui/icons-material"
import { IconLinkText } from "@appTypes/businesses";
import strings from "@utils/strings"
import { Tooltip } from "@mui/material";

/**
 * A row of tag-related badges applied to business titles.
 * @param tags a list of tags for a given business
 */
export function BadgesRow(tags: Array<Tag>) {
    let badges : Array<IconLinkText> = [];

    if (tags.includes(Tag.UkrainianOwned)) {
        badges.push({
            icon: (
                <IconLoyalty className="text-ukraine-blue cursor-pointer" />
            ),
            text: strings.businesses.tag.ukrainianOwned 
        })
    }

    return (
        <>
            {
                badges.map(
                    ({ text, icon }, index: number) =>
                    <Tooltip title={ text ?? "" } key={ index }>
                        { icon ?? <></> }
                    </Tooltip>
                )
            }
        </>
    )
}