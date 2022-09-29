import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    CardActionArea,
    CardMedia,
  } from "@mui/material"
import defaults from "@utils/config"
import Image from 'next/image'

/**
 * A business card that displays basic (preview) information about a business.
 * @param fields all fields of a Business record according to the Airtable schema
 */
export default function BusinessCard({ fields }: any) {

    const imageSrc = fields['Image'][0]['url'] || defaults.businesses.gallery.defaultImage.src
 
    return (
        <Card className="max-w-64">
            <CardActionArea>
                <CardMedia 
                    component="img"
                    className="h-36"
                    image={ imageSrc }
                    alt={ fields['Name'] }
                />
                <CardContent>
                    <h1 className="text-lg font-medium">{ fields['Name'] }</h1>
                    <span className="opacity-80 break-words prose line-clamp-3">{ fields['Description'] }</span>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
