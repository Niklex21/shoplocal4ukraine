import { BusinessModel } from "@api/business/types"
import {
    Card,
    CardContent,
    CardActionArea,
    CardMedia,
  } from "@mui/material"
import { Place as IconPlace } from "@mui/icons-material"
import defaults from "@utils/config"
import { affiliationCategoryConverter, businessCategoryConverter } from "@utils/converters"

/**
 * A business card that displays basic (preview) information about a business.
 * @param fields all fields of a Business record according to the Airtable schema
 */
export default function BusinessCard({ data, active } : { data: BusinessModel, active: boolean }) {

    const imageSrc = data.images && data.images.length > 0 ? data.images[0] : defaults.businesses.gallery.defaultImage.src
 
    return (
        <Card className={ `max-w-xs flex border-2 ${ active ? "border-ukraine-blue" : "border-transparent"}` }>
            <CardActionArea>
                <CardMedia 
                    component="img"
                    className="h-36"
                    image={ imageSrc }
                    alt={ data.name }
                />
                <CardContent>
                    <div className="text-sm text-ukraine-blue font-semibold">
                        { businessCategoryConverter(data.businessCategory) }
                        &nbsp;&bull;&nbsp;
                        { affiliationCategoryConverter(data.affiliation) }
                    </div>
                    <h1 className="text-lg mt-2 font-medium">{ data.name }</h1>
                    <div className="text-gray-500 break-words line-clamp-3 mt-2">{ data.description }</div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
