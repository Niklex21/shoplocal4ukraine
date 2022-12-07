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

/**
 * A business card that displays basic (preview) information about a business.
 * @param fields all fields of a Business record according to the Airtable schema
 */
export default function BusinessCard({ data, active } : { data: BusinessModel, active: boolean }) {

    const imageSrc = getBusinessProfileImageSrc(data)

    return (
        <div className={ `transition-all duration-100 p-1 pb-3 hover:drop-shadow-2xl bg-white group flex flex-col w-full md:min-w-[12rem] md:max-w-[20rem] gap-3 shrink rounded-lg ${ active ? "drop-shadow-2xl" : "" }` }>
            <div className="flex relative w-full h-64 md:aspect-[5/3] md:h-auto">
                <Image
                    src={ imageSrc }
                    alt={ data.name }
                    layout="fill"
                    className="relative object-cover rounded-lg"
                />
            </div>
            <div className="flex flex-col gap-2 px-3">
                <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center">
                        <h1 className="font-medium line-clamp-1">{ data.name }</h1>
                        { BadgesRow(data.tags) }
                    </div>
                    <div className="text-base opacity-60">
                        { data.location.city ?? "Online"}
                    </div>
                </div>
                <div className="flex flex-row w-full justify-between text-sm font-semibold uppercase">
                    <text className="text-ukraine-blue">
                        { businessCategoryConverter(data.businessCategory) }
                    </text>
                </div>
            </div>
        </div>
    )
}
