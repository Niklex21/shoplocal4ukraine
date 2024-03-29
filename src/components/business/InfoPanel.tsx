import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tooltip,
  SwipeableDrawer,
  Drawer,
  Button,
  Box,
} from "@mui/material";
import strings from "@utils/strings";
import {
  getBusinessImagesWithDefault,
  isEmpty,
  urlShortener,
} from "@utils/utils";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BusinessViewContext } from "src/pages/businesses";
import { IconLinkText, PanelState } from "@appTypes/businesses";
import { twMerge } from "tailwind-merge";
import {
  Report as IconReport,
  ContentCopy as IconCopy,
  KeyboardArrowDown as IconArrowDown,
  Edit as IconEdit,
  Public as IconWebsite,
  Email as IconEmail,
  Phone as IconPhone,
  ShareOutlined as IconShare,
  Place as IconAddress,
  ArrowForward as IconArrow,
  ChevronRight,
  ChevronLeft,
  Circle,
} from "@mui/icons-material";
import {
  atomCurrentBusiness,
  atomSelectedBusinessID,
} from "src/atoms/businesses";
import { useAtom } from "jotai";
import SharePanel from "./SharePanel";
import { BadgesRow } from "./BadgesRow";
import { toast } from "react-toastify";
import ReportPanel from "./ReportPanel";
import InfoEditPanel from "./InfoEditPanel";
import defaults from "@utils/config";
import { isMobile } from "react-device-detect";
import { paperClasses } from "@mui/material/Paper";
import { Tag } from "@api/business/types";
import FeedbackPanel from "./FeedbackPanel";
import FormattedText from "./FormattedText";
import ImageCarousel from "@components/common/ImageCarousel";

type Props = {
  className?: string;
  panelState: PanelState;
  setPanelState: (s: PanelState) => void;
};

/**
 * The info panel on the right that displays the details of the selected business.
 */
export const InfoPanel = ({ className, panelState, setPanelState }: Props) => {
  let { logger } = useContext(BusinessViewContext);
  const [business] = useAtom(atomCurrentBusiness);
  const [selectedID, setSelectedID] = useAtom(atomSelectedBusinessID);

  const [sharePanelState, setSharePanelState] = useState<PanelState>(
    PanelState.Closed
  );
  const [reportPanelState, setReportPanelState] = useState<PanelState>(
    PanelState.Closed
  );
  const [infoEditPanelState, setInfoEditPanelState] = useState<PanelState>(
    PanelState.Closed
  );
  const [feedbackPanelState, setFeedbackPanelState] = useState<PanelState>(
    PanelState.Closed
  );

  // add a component to the logger object
  logger = logger.with({ component: "Info" });

  if (isEmpty(business)) {
    logger.debug("Attempted to load Info, the object is empty.");
    return <></>;
  }

  logger.debug(`Loading Info for selected business: ${business.id}`);

  let contacts: Array<IconLinkText & { tooltipText?: string }> = [];
  let imagesSrc: Array<string> = getBusinessImagesWithDefault(business);

  contacts = [
    ...(business.location.address
      ? [
          {
            icon: <IconAddress />,
            text: business.location.address,
            tooltipText: strings.businesses.infoPage.tooltipAddress,
          },
        ]
      : []),
    ...(business.website
      ? [
          {
            icon: <IconWebsite />,
            text: urlShortener(business.website),
            link: business.website,
            tooltipText: strings.businesses.infoPage.tooltipWebsite,
          },
        ]
      : []),
    ...(business.email
      ? [
          {
            icon: <IconEmail />,
            text: business.email,
            link: `mailto:${business.email}`,
            tooltipText: strings.businesses.infoPage.tooltipEmail,
          },
        ]
      : []),
    ...(business.phone
      ? [
          {
            icon: <IconPhone />,
            text: business.phone,
            link: `tel:${business.phone}`,
            tooltipText: strings.businesses.infoPage.tooltipPhone,
          },
        ]
      : []),
  ];

  const Info = (
    <Card className="relative md:h-full w-full max-w-full rounded-none overflow-y-scroll bg-white dark:bg-oxford-blue text-oxford-blue dark:text-white">
      <ImageCarousel imagesSrc={imagesSrc} businessName={business.name} />
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <div>
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <h1 className="text-2xl font-medium mr-1">{business.name}</h1>
              </div>
              <div className="flex flex-wrap gap-2 flex-row text-base mt-1 opacity-80 content-center">
                <div className="flex align-middle">
                  {business.serializedBusinessCategory}
                </div>
                <div className="flex">{BadgesRow(business.tags)}</div>
              </div>
            </div>
            <div className="flex shrink justify-self-center items-center gap-3">
              <Tooltip title={strings.businesses.infoPage.tooltipShare}>
                <IconButton
                  className="ring-1 ring-current opacity-80 hover:brightness-95 text-ukraine-blue dark:text-ukraine-yellow hover:opacity-100"
                  onClick={() => setSharePanelState(PanelState.Open)}
                >
                  <IconShare className="text-2xl" />
                </IconButton>
              </Tooltip>
              <Tooltip title={strings.businesses.infoPage.tooltipReport}>
                <IconButton
                  className="ring-1 ring-current opacity-80 hover:brightness-95 text-ukraine-blue dark:text-ukraine-yellow hover:opacity-100"
                  onClick={() => setReportPanelState(PanelState.Open)}
                >
                  <IconReport className="text-2xl" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {business.location?.googleMapsURL ? (
              <div className="group flex content-center flex-row w-full gap-4 bg-white dark:bg-oxford-blue px-2 py-1 opacity-80 hover:brightness-95 dark:hover:brightness-110 text-ukraine-blue dark:text-white hover:opacity-100 items-center rounded-lg">
                <IconArrow />
                <div className="flex flex-row w-full justify-between gap-2">
                  <Link
                    target="_blank"
                    href={business.location?.googleMapsURL || "#"}
                  >
                    <span className="break-all underline lg:no-underline hover:underline align-middle">
                      {strings.businesses.infoPage.googleMapsURLText}
                    </span>
                  </Link>
                  <Tooltip
                    title={strings.businesses.infoPage.tooltipCopyGoogleMapsURL}
                    arrow={true}
                    placement="right"
                  >
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(
                          business.location?.googleMapsURL || ""
                        );
                        toast.success(
                          strings.businesses.sharePanel.toastSuccessCopy
                        );
                      }}
                    >
                      <IconCopy className="text-base text-current md:invisible group-hover:visible dark:text-white" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div>
              {contacts.map(
                ({ icon, link, text, tooltipText }, index: number) => (
                  <div key={index} className="cursor-pointer">
                    <div className="group content-center flex flex-row w-full gap-4 bg-white dark:bg-oxford-blue dark:text-ukraine-white dark:hover:brightness-110 px-2 py-1 opacity-80 hover:brightness-95 hover:opacity-100 items-center rounded-lg">
                      {icon}
                      <div className="flex flex-row w-full justify-between gap-2">
                        {link ? (
                          <Link target="_blank" href={link || "#"}>
                            <span
                              className={twMerge(
                                "break-all",
                                link
                                  ? "underline lg:no-underline hover:underline align-middle"
                                  : ""
                              )}
                            >
                              {text}
                            </span>
                          </Link>
                        ) : (
                          text
                        )}
                        <Tooltip
                          title={
                            strings.businesses.infoPage.tooltipCopy +
                            " " +
                            tooltipText
                          }
                          arrow={true}
                          placement="right"
                        >
                          <IconButton
                            onClick={() => {
                              navigator.clipboard.writeText(text || "");
                              toast.success(
                                strings.businesses.sharePanel.toastSuccessCopy
                              );
                            }}
                          >
                            <IconCopy className="text-base text-current md:invisible group-hover:visible dark:text-white" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex w-full justify-center align-center dark:text-ukraine-yellow">
              <Button
                variant="outlined"
                className="rounded-full normal-case opacity-80 hover:opacity-100 dark:border-ukraine-yellow"
                onClick={() => setInfoEditPanelState(PanelState.Open)}
              >
                <IconEdit className="dark:text-ukraine-yellow" />
                &nbsp;
                <text className="font-bold dark:text-ukraine-yellow">
                  {strings.businesses.infoPage.addSuggestEdit}
                </text>
              </Button>
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-2">
              <h3 className="prose text-xl font-semibold dark:text-slate-100">{ strings.businesses.infoPage.sectionTitle.description }</h3>
              <FormattedText input={business.description} className="prose break-words opacity-80"/>
          </div>
          <hr />
          <div className="flex flex-col gap-2 md:mb-0 mb-32">
              <h3 className="prose text-xl font-semibold dark:text-slate-100">{ strings.businesses.infoPage.sectionTitle.contributions }</h3>
              <FormattedText input={business.contributions} className="prose break-words opacity-80"  />
          </div>

          {/* GIVE FEEDBACK SECTION */}
          <hr />
          <span
            className="flex italic cursor-pointer underline text-slate-400 text-base hover:text-ukraine-blue dark:hover:text-ukraine-yellow"
            onClick={() => setFeedbackPanelState(PanelState.Open)}
          >
            {strings.all.giveFeedback.full}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  // a puller component to render at the top of the Info Panel
  const MobilePuller = ({ className }: { className?: string }) => (
    <div
      className={twMerge(
        `flex bg-white dark:bg-oxford-blue w-full h-14 align-middle drop-shadow-t-md justify-center p-2 visible`,
        className
      )}
      onClick={() => {
        panelState === PanelState.Closed
          ? setPanelState(PanelState.Open)
          : setPanelState(PanelState.Closed),
          setSelectedID("");
      }}
    >
      <IconButton>
        <IconArrowDown className="font-bold w-16 h-16 dark:text-white" />
      </IconButton>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <SwipeableDrawer
          anchor="bottom"
          open={panelState === PanelState.Open}
          onClose={() => {
            setPanelState(PanelState.Closed);
            setSelectedID("");
          }}
          onOpen={() => setPanelState(PanelState.Open)}
          disableEnforceFocus
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              // Since overflow is visible here and not 'auto' or 'scroll', the scrolling needs to happen in a nested div
              overflow: "visible",
              height: `calc(90% - ${defaults.businesses.infoPanel.bleedingArea})`,
            },
          }}
          className={twMerge("w-full", "z-40 drop-shadow-none", className)}
        >
          <Box height="100%" overflow="auto">
            <MobilePuller />
            {Info}
          </Box>
        </SwipeableDrawer>
      ) : (
        <Drawer
          anchor="left"
          open={panelState === PanelState.Open}
          onClose={() => setPanelState(PanelState.Closed)}
          className={twMerge(
            "md:h-full z-10 drop-shadow-lg md:max-w-full",
            className
          )}
          hideBackdrop={true}
          elevation={0}
          disableEnforceFocus
          sx={{
            [`& .${paperClasses.root}`]: {
              width: "100%",
            },
          }}
        >
          {Info}
        </Drawer>
      )}
      <FeedbackPanel
        panelState={feedbackPanelState}
        closePanel={() => setFeedbackPanelState(PanelState.Closed)}
      />
      <SharePanel
        panelState={sharePanelState}
        closePanel={() => setSharePanelState(PanelState.Closed)}
      />
      <ReportPanel
        panelState={reportPanelState}
        closePanel={() => setReportPanelState(PanelState.Closed)}
      />
      <InfoEditPanel
        panelState={infoEditPanelState}
        closePanel={() => setInfoEditPanelState(PanelState.Closed)}
      />
    </>
  );
};
