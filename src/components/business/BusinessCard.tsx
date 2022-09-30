import { BusinessModel } from "@api/business/model"
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    CardActionArea,
    CardMedia,
  } from "@mui/material"
import defaults from "@utils/config"

/**
 * A business card that displays basic (preview) information about a business.
 * @param fields all fields of a Business record according to the Airtable schema
 */
export default function BusinessCard({ data, active } : { data: BusinessModel, active: boolean }) {

    const imageSrc = data.images && data.images.length > 0 ? data.images[0] : defaults.businesses.gallery.defaultImage.src
 
    return (
        <Card className={ `border-2 ${ active ? "border-ukraine-blue" : "border-transparent"}` }>
            <CardActionArea>
                <CardMedia 
                    component="img"
                    className="h-36"
                    image={ imageSrc }
                    alt={ data.name }
                />
                <CardContent>
                    <h1 className="text-lg font-medium">{ data.name }</h1>
                    <span className="opacity-80 break-words prose line-clamp-3">{ data.description }</span>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
