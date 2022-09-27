import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react"

import LocationOnIcon from '@mui/icons-material/LocationOn'
import Image from 'next/image'

/**
 * A business card that displays basic (preview) information about a business.
 * @param fields all fields of a Business record according to the Airtable schema
 */
export default function BusinessCard({ fields }: any) {
    return (
        <Card className="w-full max-w-xs relative h-card">
        <CardHeader floated={false} color="blue" className="h-48">
            <Image
            src={'/public/business_default_image.jpg'}
            alt="img-blur-shadow"
            className="h-full w-full"
            layout="fill"
            />
        </CardHeader>
        <CardBody className="text-center">
            <Typography variant="h5" className="mb-2">
                {fields.Name.length > 40 ? fields.Name.slice(0, 40)+"..." : fields.Name}
            </Typography>
            {/* <Typography className="mb-2 font-semibold">
                <LocationOnIcon fontSize="small"/>{fields.Address}
            </Typography> */}
            <Typography>
                {fields.Description.length > 90 ? fields.Description.slice(0, 90)+"..." : fields.Description}
            </Typography>
        </CardBody>
        <CardFooter className="py-3 mt-5">
        </CardFooter>
        <CardFooter divider className="flex items-center justify-between py-3 absolute bottom-0 left-0 w-full">
            <Typography variant="h6" color="blue">{fields.Category}</Typography>
            <Typography variant="h6" className="flex gap-1 text-ukraine-yellow">
                {fields.Affiliation}
            </Typography>
        </CardFooter>
        </Card>
    );
}