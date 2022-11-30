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

/**
 * A business card that displays basic (preview) information about a business.
 * @param fields all fields of a Business record according to the Airtable schema
 */
export default function BusinessCard({ data, active } : { data: BusinessModel, active: boolean }) {

    const imageSrc = getBusinessProfileImageSrc(data)

    return (
        <Card className={ `flex w-80 shrink border-2 ${ active ? "border-ukraine-blue" : "border-transparent"}` }>
            <CardActionArea>
                <CardMedia
                    component="img"
                    className="h-36"
                    image={ imageSrc }
                    alt={ data.name }
                />
                <CardContent className="flex flex-col gap-1">
                    <div className="flex flex-row w-full justify-between text-sm font-semibold uppercase">
                        <text className="text-ukraine-blue">
                            { businessCategoryConverter(data.businessCategory) }
                        </text>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <h1 className="text-lg font-medium line-clamp-1">{ data.name }</h1>
                        { BadgesRow(data.tags) }
                    </div>
                    <div className="">
                        { data.location.city }
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
