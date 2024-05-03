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
    emoji?: string,
    shortText?: string
}

/**
 * A row of tag-related badges applied to business titles.
 * @param tags a list of tags for a given business
 */
export function BadgesRow(tags: Array<Tag>) {
    let map : { [key in Tag]: Badge} = {
        [Tag.UkrainianOwned]: {
            color: "bg-yellow-100",
            emoji: "🇺🇦"
        },
        [Tag.Online]: {
            color: "bg-blue-100",
            emoji: "🌐"
        },
        [Tag.LeadSupporter]: {
            color: "bg-orange-100",
            emoji: "🏆"
        },
        [Tag.OnRequest]: {
            color: "bg-green-100",
            emoji: "📞"
        },
        [Tag.SellUkrainianProducts]: {
            color: "bg-pink-100",
            emoji: "🛒"
        },
        [Tag.HiresUkrainians]: {
            color: "bg-purple-100",
            emoji: "💼"
        }
    }

    let badges : Array<Badge> = tags.map(t => {
        return { ...map[t], tooltip: strings.businesses.tagExtended[t], shortText: strings.businesses.tagShort[t] }
    });

    return (
        <div className="flex gap-1">
            {
                badges.map(
                    ({ emoji, shortText, icon, color, tooltip }, index: number) =>
                        tooltip ?
                        (
                            <Tooltip title={ tooltip ?? "" } key={ index } arrow={ true } placement="top">
                                <Chip size="small" icon={ icon ?? <></> } label={ (emoji ?? "") + " " + (shortText ?? "") } className={ twMerge("font-bold text-gray-700", color ?? "") } />
                            </Tooltip>
                        ) : (
                            <Chip size="small" icon={ icon ?? <></> } label={ (emoji ?? "") + " " + (shortText ?? "") } className={ color ?? "" } key={ index } />
                        )
                )
            }
        </div>
    )
}
