import { Card, CardMedia, CardContent, Container, IconButton, Tooltip, SwipeableDrawer, Drawer } from "@mui/material";
import strings from "@utils/strings";
import { getBusinessProfileImageSrc, isEmpty, urlShortener } from "@utils/utils";
import Link from "next/link";
import { useContext, useState } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import { IconLinkText, PanelState } from "@appTypes/businesses";
import { twMerge } from "tailwind-merge";
import { Report as IconReport, ContentCopy as IconCopy, ArrowLeft as IconArrowLeft, ArrowRight as IconArrowRight, Public as IconWebsite, Email as IconEmail, Phone as IconPhone, ShareOutlined as IconShare, Place as IconAddress, ArrowForward as IconArrow } from "@mui/icons-material";
import Image from 'next/image';
import { atomCurrentBusiness } from "src/atoms/businesses";
import { useAtom } from "jotai";
import SharePanel from "./SharePanel";
import { BadgesRow } from "./BadgesRow";
import { toast } from "react-toastify"
import ReportPanel from "./ReportPanel";
import defaults from "@utils/config";
import { isMobile } from "react-device-detect";
import { paperClasses } from "@mui/material/Paper";

type Props = {
    className?: string,
    panelState: PanelState,
    setPanelState: (s: PanelState) => void
}

/**
 * The info panel on the right that displays the details of the selected business.
 */
export const InfoPanel = ({ className, panelState, setPanelState }: Props) => {

    let { logger } = useContext(BusinessViewContext)
    const [ business ] = useAtom(atomCurrentBusiness)

    const [ sharePanelState, setSharePanelState ] = useState<PanelState>(PanelState.Closed)
    const [ reportPanelState, setReportPanelState ] = useState<PanelState>(PanelState.Closed)

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
        ...(business.location.address ? [{
                icon: (
                    <IconAddress />
                ),
                text: business.location.address
            }] : []
        ),
        ...(business.website ? [{
                icon: (
                    <IconWebsite />
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
        <Card className='overflow-y-scroll overflow-x-none h-full w-full rounded-none'>
            <CardMedia
                component="img"
                className="h-48 hidden md:block"
                image={ imageSrc }
                alt={ business.name }
            />
            <CardContent>
                <div className="relative md:hidden rounded-lg w-full h-48">
                    <Image
                        className="w-full object-contain rounded-lg"
                        layout="fill"
                        src={ imageSrc }
                        alt={ business.name }
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <div>
                            <div className="flex flex-row flex-wrap gap-1 items-center">
                                <h1 className="text-2xl font-medium mr-1">{ business.name }</h1>
                                { BadgesRow(business.tags) }
                            </div>
                            <div className="flex flex-wrap gap-2 flex-row text-base mt-1 opacity-80">
                                { business.serializedBusinessCategory }
                            </div>
                        </div>
                        <div className="flex shrink justify-self-center items-center gap-3">
                            <Tooltip title={ strings.businesses.infoPage.tooltipShare }>
                                <IconButton
                                    className="text-ukraine-blue ring-1 ring-current"
                                    onClick={ () => setSharePanelState(PanelState.Open) }
                                >
                                    <IconShare className="text-2xl" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={ strings.businesses.infoPage.tooltipReport }>
                                <IconButton
                                    className="text-red-600 ring-1 ring-current"
                                    onClick={ () => setReportPanelState(PanelState.Open) }
                                >
                                    <IconReport className="text-2xl" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="group flex flex-row w-full gap-4 bg-white px-2 py-1 opacity-80 hover:brightness-95 text-ukraine-blue hover:opacity-100 items-center rounded-lg">
                        <IconArrow />
                        <div className="flex flex-row w-full justify-between gap-2 items-center">
                            <Link href={ business.location.googleMapsURL || "#" }>
                                <a target="_blank">
                                    <span className="break-all underline lg:no-underline hover:underline">
                                        { strings.businesses.infoPage.googleMapsURLText }
                                    </span>
                                </a>    
                            </Link>
                            <Tooltip title={ strings.businesses.infoPage.tooltipCopyGoogleMapsURL }>
                                <IconButton
                                    onClick={ () => {
                                        navigator.clipboard.writeText(business.location.googleMapsURL || "")
                                        toast.success(strings.businesses.sharePanel.toastSuccessCopy)
                                    }}
                                >
                                    <IconCopy className="text-base text-current md:invisible group-hover:visible" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        {
                            contacts.map(
                                ({ icon, link, text }, index: number) => (
                                    <div key={ index } className="cursor-pointer">
                                        <div className="group flex flex-row w-full gap-4 bg-white px-2 py-1 opacity-80 hover:brightness-95 hover:opacity-100 items-center rounded-lg">
                                            { icon }
                                            <div className="flex flex-row w-full justify-between gap-2 items-center">
                                                {
                                                    link ? (
                                                        <Link href={ link || "#" }>
                                                            <a target="_blank">
                                                                <span className={ twMerge("break-all", link ? "underline lg:no-underline hover:underline" : "") }>
                                                                    { text }
                                                                </span>
                                                            </a>    
                                                        </Link>
                                                    ) : text
                                                }
                                                <Tooltip title={ strings.businesses.infoPage.tooltipCopy }>
                                                    <IconButton
                                                        onClick={ () => {
                                                            navigator.clipboard.writeText(text || "")
                                                            toast.success(strings.businesses.sharePanel.toastSuccessCopy)
                                                        }}
                                                    >
                                                        <IconCopy className="text-base text-current md:invisible group-hover:visible" />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </div>
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
                    <hr />
                    <div>
                        <h3 className="prose text-xl mb-1 font-semibold">{ strings.businesses.infoPage.sectionTitle.contributions }</h3>
                        <span className="prose break-words opacity-80">{ business.contributions }</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    // a puller component to render at the top of the Info Panel
    const MobilePuller = () => (
        <div
            className={`flex bg-white w-full h-10 rounded-t-md align-middle drop-shadow-t-md justify-center p-2 absolute visible left-0`}
            style={{
                top: `-${ defaults.businesses.infoPanel.bleedingArea }px`
            }}
        >
            <div className="rounded-full w-10 h-2 my-auto bg-gray-700"></div>
        </div>
    )


    return (
        <>
            {
                isMobile ?
                (
                    <SwipeableDrawer
                        anchor="bottom"
                        open={ panelState === PanelState.Open }
                        onClose={ () => setPanelState(PanelState.Closed) }
                        onOpen={ () => setPanelState(PanelState.Open) }
                        swipeAreaWidth={ defaults.businesses.infoPanel.bleedingArea }
                        disableSwipeToOpen={ false }
                        ModalProps={{
                            keepMounted: true
                        }}
                        className={ twMerge("md:h-full md:flex z-40 drop-shadow-none", className) }
                        hideBackdrop={ true }
                    >
                        <MobilePuller />
                        { Info }
                    </SwipeableDrawer>
                ) : (
                    <>
                        <Drawer
                            anchor="left"
                            open={ panelState === PanelState.Open }
                            onClose={ () => setPanelState(PanelState.Closed) }
                            className={ twMerge("md:h-full z-0 drop-shadow-none", className) }
                            hideBackdrop={ true }
                            elevation={0}
                            sx={{
                                width: "25%",
                            }}
                        >
                            { Info }
                        </Drawer>
                    </>
                )
            }
            <SharePanel
                panelState={ sharePanelState }
                closePanel={ () => setSharePanelState(PanelState.Closed) }
            />
            <ReportPanel
                panelState={ reportPanelState }
                closePanel={ () => setReportPanelState(PanelState.Closed) }
            />
        </>
    )
}
