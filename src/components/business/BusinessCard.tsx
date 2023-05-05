import { BusinessModel } from "@api/business/types"
import {
    Card,
    CardContent,
    CardActionArea,
    CardMedia,
  } from "@mui/material"
import { businessCategoryConverter } from "@utils/converters"
import { getBusinessProfileImageSrc } from "@utils/utils"
import { BadgesRow } from "./BadgesRow"
import Image from "next/image"
import strings from "@utils/strings"
import ImageWithFallback from "@components/common/ImageWithFallback"
import defaults from "@utils/config"

/**
 * A business card that displays basic (preview) information about a business.
 * @param fields all fields of a Business record according to the Airtable schema
 */
export default function BusinessCard({ data, active } : { data: BusinessModel, active: boolean }) {

    const imageSrc = getBusinessProfileImageSrc(data)

    return (
        <div className={ `transition-all duration-200 relative p-1 pb-3 bg-white dark:bg-oxford-blue text-oxford-blue dark:text-white group flex flex-col w-full md:min-w-[12rem] md:max-w-[20rem] gap-3 shrink rounded-lg hover:drop-shadow-xl dark:hover:drop-shadow-white-xl ${ active ? "drop-shadow-xl dark:drop-shadow-white-xl" : "" }` }>
            <div className="flex relative w-full h-64 md:aspect-[5/3] md:h-auto">
                <ImageWithFallback
                    fallbackImageSrc={ defaults.businesses.gallery.defaultImage }
                    src={ imageSrc }
                    alt={ data.name }
                    fill={ true }
                    className="relative object-cover rounded-lg"
                />
            </div>
            <div className="absolute top-2 right-2">
                { BadgesRow(data.tags) }
            </div>
            <div className="flex flex-col gap-2 px-3">
                <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center">
                        <h1 className="font-medium line-clamp-1">{ data.name }</h1>
                    </div>
                    <div className="text-base opacity-60">
                        { data.location.city ?? strings.businesses.infoPage.online }
                    </div>
                </div>
                <div className="flex flex-row w-full justify-between text-sm font-semibold uppercase">
                    <text className="text-ukraine-blue dark:text-blue-400">
                        { businessCategoryConverter(data.businessCategory) }
                    </text>
                </div>
            </div>
        </div>
    )
}
