import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";


export default function BusinessMap({businesses}: any) {  
    
    return (
        <Card className="w-full max-w-xs relative ">
   
    <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
        I hate Typescript
        </Typography>
    </CardBody>
    <CardFooter className="py-3 mt-5">
    </CardFooter>
    <CardFooter divider className="flex items-center justify-between py-3 absolute bottom-0 left-0 w-full">
        <Typography variant="h6" color="blue">Putin</Typography>
        <Typography variant="h6" className="flex gap-1 yellow">
        Khuylo
        </Typography>
    </CardFooter>
    </Card>
      );
    }