import { Card, CardMedia, CardContent, Chip, Container, IconButton, Tooltip } from "@mui/material";
import defaults from "@utils/config";
import strings from "@utils/strings";
import { isEmpty, urlShortener } from "@utils/utils";
import Link from "next/link";
import { useContext, useState } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import { IconLinkText, PanelState } from "@appTypes/businesses";
import { twMerge } from "tailwind-merge";
import { Place as IconPlace, Link as IconLink, Email as IconEmail, Phone as IconPhone, Share as IconShare } from "@mui/icons-material";
import Image from 'next/image';
import { atomCurrentBusiness } from "src/atoms/businesses";
import { useAtom } from "jotai";
import SharePanel from "./SharePanel";

type Props = {
    className?: string
}

/**
 * The info panel on the right that displays the details of the selected business.
 */
export const InfoPanel = ({ className }: Props) => {

    let { logger } = useContext(BusinessViewContext)
    const [ business ] = useAtom(atomCurrentBusiness)

    const [ sharePanelState, setSharePanelState ] = useState<PanelState>(PanelState.Closed)

    // add a component to the logger object
    logger = logger.with(({ component: "Info" }))

    if (isEmpty(business)) {
        logger.debug("Attempted to load Info, the object is empty.")
        return (
            <></>
        )
    }

    logger.debug(`Loading Info for selected business: ${ business.id }`)

    let contacts : Array<IconLinkText> = [];
    let imageSrc : string = business.images && business.images.length > 0 ? business.images[0] : defaults.businesses.gallery.defaultImage.src

    contacts = [
        {
            icon: (
                <IconPlace />
            ),
            text: business.location?.city,
            link: business.location?.googleMapsURL
        },
        ...(business.website ? [{
                icon: (
                    <IconLink />
                ),
                text: urlShortener(business.website),
                link: business.website
            }] : []
        ),
        ...(business.email ? [{
                icon: (
                    <IconEmail />
                ),
                text: business.email,
                link: `mailto:${ business.email }`
            }] : []
        ),
        ...(business.phone ? [{
                icon: (
                    <IconPhone />
                ),
                text: business.phone,
                link: `tel:${ business.phone }`
            }] : []
        ),
    ]

    const Info = (
        <Card className='overflow-auto h-full w-full rounded-none'>
            <CardMedia
                component="img"
                className="h-48 hidden md:block"
                image={ imageSrc }
                alt={ business.name }
            />
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-4">
                        <div className="col-span-3">
                            <h1 className="text-2xl font-medium">{ business.name }</h1>
                            <div className="flex flex-wrap gap-2 flex-row text-base mt-1 text-ukraine-blue">
                                { business.serializedBusinessCategory }
                                {
                                    business.serializedTags.map(
                                        (tag: string) => (
                                            <>
                                                &nbsp;&bull;&nbsp;{ tag }
                                            </>
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex justify-self-center items-center">
                            <Tooltip title={ strings.businesses.infoPage.tooltipShare }>
                                <IconButton
                                    className="text-ukraine-blue rounded-full p-2"
                                    onClick={ () => setSharePanelState(PanelState.Open) }
                                >
                                    <IconShare className="text-2xl" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="relative md:hidden rounded-lg w-full h-48">
                        <Image
                            className="w-full object-contain rounded-lg"
                            layout="fill"
                            src={ imageSrc }
                            alt={ business.name }
                        />
                    </div>
                    <hr />
                    <div>
                        <h3 className="prose text-xl mb-2 font-semibold">{ strings.businesses.infoPage.sectionTitle.contacts }</h3>
                        {
                            contacts.map(
                                ({ icon, link, text }, index: number) => (
                                    <div key={ index } className="mt-1 cursor-pointer hover:text-ukraine-blue hover:opacity-100 opacity-80">
                                        <Link href={ link || "#" }>
                                            <div className="flex flex-nowrap flex-row gap-2">
                                                { icon }
                                                <a target="_blank">
                                                    <span className="break-all">
                                                        { text }
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
                        <span className="prose break-words opacity-80">{ business.description }</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <>
            <Container className={ twMerge('flex-col max-w-full overflow-auto p-0 md:h-screen border-t-2 border-black md:border-none', className) }>
                { Info }
            </Container>
            <SharePanel
                panelState={ sharePanelState }
                closePanel={ () => setSharePanelState(PanelState.Closed) }
            />
        </>
    )
}
