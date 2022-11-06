import { BusinessModel, Tag } from "@api/business/types";
import { Card, CardMedia, CardContent, Chip, Container } from "@mui/material";
import defaults from "@utils/config";
import { businessCategoryConverter, tagConverter } from "@utils/converters";
import strings from "@utils/strings";
import { findBusinessById, urlShortener } from "@utils/utils";
import Link from "next/link";
import { useContext } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import { ContactsRow } from "@appTypes/businesses";
import { twMerge } from "tailwind-merge";
import { Place as IconPlace, Link as IconLink, Email as IconEmail, Phone as IconPhone } from "@mui/icons-material";
import Image from 'next/image';

/**
 * The info panel on the right that displays the details of the selected business.
 */
export const InfoPanel = ({ className }: any) => {

    const { businesses, selectedID, logger } = useContext(BusinessViewContext)

    let data : BusinessModel = {} as BusinessModel;
    let imageSrc: string = "";
    let contacts : Array<ContactsRow> = [];

    if (selectedID !== "") {
        data = findBusinessById(businesses, selectedID)

        imageSrc = data.images && data.images.length > 0 ? data.images[0] : defaults.businesses.gallery.defaultImage.src

        contacts = [
            {
                icon: (
                    <IconPlace />
                ),
                content: data.location?.city,
                link: data.location?.googleMapsURL
            },
            ...(data.website ? [{
                    icon: (
                        <IconLink />
                    ),
                    content: urlShortener(data.website),
                    link: data.website
                }] : []
            ),
            ...(data.email ? [{
                    icon: (
                        <IconEmail />
                    ),
                    content: data.email,
                    link: `mailto:${ data.email }`
                }] : []
            ),
            ...(data.phone ? [{
                    icon: (
                        <IconPhone />
                    ),
                    content: data.phone,
                    link: `tel:${ data.phone }`
                }] : []
            ),
        ]
    }

    const Info =
        selectedID === ""
        ? (<>{ strings.businesses.infoPage.noBusinessSelected }</>)
        : (
            <Card className='overflow-auto h-full w-full rounded-none'>
                <CardMedia
                  component="img"
                  className="h-48 hidden md:block"
                  image={ imageSrc }
                  alt={ data.name }
                />
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">{ data.name }</h1>
                        <div className="flex flex-wrap gap-2 flex-row">
                            <Chip className="text-base text-white bg-ukraine-blue" label={ businessCategoryConverter(data.businessCategory) } />
                            {
                                data.tags.map(
                                    (tag: Tag, index: number) => (
                                        <Chip key={ index } className="text-base text-black bg-ukraine-yellow" label={ tagConverter(tag) } />
                                    )
                                )
                            }
                        </div>
                        <div className="relative md:hidden rounded-lg w-full h-48">
                            <Image
                                className="w-full object-contain rounded-lg"
                                layout="fill"
                                src={ imageSrc }
                                alt={ data.name }
                            />
                        </div>
                        <hr />
                        <div>
                            <h3 className="prose text-xl mb-2 font-semibold">{ strings.businesses.infoPage.sectionTitle.contacts }</h3>
                            {
                                contacts.map(
                                    ({ icon, content, link } : { icon: JSX.Element, content: string, link: string }, index: number) => (
                                        <div key={ index } className="mt-1 cursor-pointer hover:text-ukraine-blue hover:opacity-100 opacity-80">
                                            <Link href={ link || "#" }>
                                                <div className="flex flex-nowrap flex-row gap-2">
                                                    { icon }
                                                    <a target="_blank">
                                                    <span className="break-all">
                                                        { content }
                                                    </span>
                                                    </a>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        <hr />
                        <div>
                            <h3 className="prose text-xl mb-1 font-semibold">{ strings.businesses.infoPage.sectionTitle.description }</h3>
                            <span className="prose break-words opacity-80">{ data.description }</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )

    logger.with({ component: "Info" }).debug(`Loading Info for selected business: ${ selectedID }`, data)

    return (
        <Container className={ twMerge('flex-col max-w-full overflow-auto p-0 md:h-screen border-t-2 border-black md:border-none', className) }>
            { Info }
        </Container>
    )
}
