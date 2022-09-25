/**
 * A business card that displays basic (preview) information about a business.
 * @param fields all fields of a Business record according to the Airtable schema
 */
 import { Props } from "@headlessui/react/dist/types";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function BusinessCard({fields}: any) {
return (
    <Card className="w-full max-w-xs relative h-card">
    <CardHeader floated={false} color="blue" className="h-48">
        <img
        src={fields.Image}
        alt="img-blur-shadow"
        className="h-full w-full"
        />
    </CardHeader>
    <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
        {fields.Name.length > 40 ? fields.Name.slice(0, 40)+"..." : fields.Name}
        </Typography>
        <Typography className="mb-2 font-semibold">
        <LocationOnIcon fontSize="small"/>{fields.Address}
        </Typography>
        <Typography>
        {fields.Description.length > 90 ? fields.Description.slice(0, 90)+"..." : fields.Description}
        </Typography>
    </CardBody>
    <CardFooter className="py-3 mt-5">
    </CardFooter>
    <CardFooter divider className="flex items-center justify-between py-3 absolute bottom-0 left-0 w-full">
        <Typography variant="h6" color="blue">{fields.Category}</Typography>
        <Typography variant="h6" className="flex gap-1 yellow">
        {fields.Affiliation}
        </Typography>
    </CardFooter>
    </Card>
);
}