import { Card, CardMedia, CardContent, Container, IconButton, Tooltip } from "@mui/material";
import strings from "@utils/strings";
import { getBusinessProfileImageSrc, isEmpty, urlShortener } from "@utils/utils";
import Link from "next/link";
import { useContext, useState } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import { IconLinkText, PanelState } from "@appTypes/businesses";
import { twMerge } from "tailwind-merge";
import { ContentCopy as IconCopy, Link as IconLink, Email as IconEmail, Phone as IconPhone, ShareOutlined as IconShare } from "@mui/icons-material";
import Image from 'next/image';
import { atomCurrentBusiness } from "src/atoms/businesses";
import { useAtom } from "jotai";
import SharePanel from "./SharePanel";
import { BadgesRow } from "./BadgesRow";
import { toast } from "react-toastify"

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
    let imageSrc : string = getBusinessProfileImageSrc(business)

    contacts = [
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
                    <div className="flex flex-row justify-between">
                        <div className="">
                            <div className="flex flex-row flex-wrap gap-1 items-center">
                                <h1 className="text-2xl font-medium mr-1">{ business.name }</h1>
                                { BadgesRow(business.tags) }
                            </div>
                            <div className="flex flex-wrap gap-2 flex-row text-base mt-1 opacity-80">
                                { business.serializedBusinessCategory }
                            </div>
                        </div>
                        <div className="flex shrink justify-self-center items-center">
                            <Tooltip title={ strings.businesses.infoPage.tooltipShare }>
                                <IconButton
                                    className="text-ukraine-blue ring-1 ring-ukraine-blue"
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
                        <h3 className="prose text-xl mb-1 font-semibold">{ strings.businesses.infoPage.sectionTitle.description }</h3>
                        <span className="prose break-words opacity-80">{ business.description }</span>
                    </div>
                    <hr />
                    <div>
                        <h3 className="prose text-xl mb-1 font-semibold">{ strings.businesses.infoPage.sectionTitle.contributions }</h3>
                        <span className="prose break-words opacity-80">{ business.contributions }</span>
                    </div>
                    <hr />
                    <div>
                        <h3 className="prose text-xl mb-2 font-semibold">{ strings.businesses.infoPage.sectionTitle.contacts }</h3>
                        {
                            contacts.map(
                                ({ icon, link, text }, index: number) => (
                                    <div key={ index } className="mt-1 cursor-pointer">
                                        <div className="flex flex-row w-full gap-4 bg-white px-2 opacity-80 hover:brightness-95 hover:opacity-100 items-center rounded-lg">
                                            { icon }
                                            <div className="flex flex-row w-full justify-between gap-2 items-center">
                                                <Link href={ link || "#" }>
                                                    <a target="_blank">
                                                        <span className="break-all hover:underline">
                                                            { text }
                                                        </span>
                                                    </a>    
                                                </Link>
                                                <Tooltip title={ strings.businesses.infoPage.tooltipCopy }>
                                                    <IconButton
                                                        onClick={ () => {
                                                            navigator.clipboard.writeText(text || "")
                                                            toast.success(strings.businesses.sharePanel.toastSuccessCopy)
                                                        }}
                                                    >
                                                        <IconCopy className="text-base text-current" />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        }
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
