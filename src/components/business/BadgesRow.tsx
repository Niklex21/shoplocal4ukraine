import { Tag } from "@api/business/types";
import { LoyaltyTwoTone as IconLoyalty } from "@mui/icons-material"
import { IconLinkText } from "@appTypes/businesses";
import strings from "@utils/strings"
import { Chip, Tooltip } from "@mui/material";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Badge = {
    icon?: JSX.Element,
    tooltip?: string,
    color?: string,
    content?: ReactNode
}

/**
 * A row of tag-related badges applied to business titles.
 * @param tags a list of tags for a given business
 */
export function BadgesRow(tags: Array<Tag>) {
    let badges : Array<Badge> = [];

    if (tags.includes(Tag.UkrainianOwned)) {
        badges.push({
            tooltip: strings.businesses.tag.ukrainianOwned,
            color: "bg-yellow-100",
            content: (<>🇺🇦 owned</>)
        })
    }

    return (
        <>
            {
                badges.map(
                    ({ content, icon, color, tooltip }, index: number) =>
                        tooltip ?
                        (
                            <Tooltip title={ tooltip ?? "" } key={ index } arrow={ true } placement="top">
                                <Chip size="small" icon={ icon ?? <></> } label={ content ?? <></> } className={ twMerge("font-bold text-gray-700", color ?? "") } />
                            </Tooltip>
                        ) : (
                            <Chip size="small" icon={ icon ?? <></> } label={ content ?? <></> } className={ color ?? "" } key={ index } />
                        )
                )
            }
        </>
    )
}