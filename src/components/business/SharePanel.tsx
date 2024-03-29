import { FullScreenPanelPosition, IconLinkText, PanelState } from "@appTypes/businesses"
import { atomCurrentBusiness, atomSearchQuery, atomSelectedBusinessID, atomSelectedCategories, atomSelectedTags, atomView } from "src/atoms/businesses"
import FullScreenPanel from "@components/common/FullScreenPanel"
import strings from "@utils/strings"
import { atom, useAtom } from "jotai"
import { twMerge } from "tailwind-merge"
import Image from 'next/image'
import defaults, { LOCAL_STORAGE_KEYS } from "@utils/config"
import { ContentCopy as IconCopy, Facebook, Instagram, LinkedIn, Message, Telegram, Twitter, WhatsApp } from "@mui/icons-material"
import { Checkbox, FormControlLabel, FormGroup, IconButton, Tooltip } from "@mui/material"
import { atomWithStorage } from "jotai/utils"
import { getBusinessProfileImageSrc } from "@utils/utils"
import { useEffect } from "react"
import { toast } from "react-toastify"
import ImageWithFallback from "@components/common/ImageWithFallback"

type Props = {
    className?: string,
    panelState: PanelState,
    closePanel: () => void,
}

const atomShortenBusinessURL = atomWithStorage<boolean>("checkboxShortenBusinessURL", true)
// need this to re-render atomURLToCopy on panel close/open
const atomWindowUrl = atom<string>("")

// builds the current URL to copy based on the modification checkbox statuses
const atomURLToCopy = atom<string>(
    (get) => {
        // cut off all the parameters
        let url = get(atomWindowUrl)

        if (get(atomSelectedBusinessID) !== "" && get(atomShortenBusinessURL)) {
            url = url.replaceAll(new RegExp("#.*", 'g'), "").replaceAll('businesses', '')
            url += "b/" + get(atomSelectedBusinessID)
        }

        return url
    }
)

const socials : Array<IconLinkText> = [
    {
        icon: <LinkedIn />,
        link: "#",
        text: "LinkedIn"
    },
    {
        icon: <Facebook />,
        link: "#",
        text: "Facebook"
    },
    {
        icon: <Instagram />,
        link: "#",
        text: "Instagram"
    },
    {
        icon: <Twitter />,
        link: "#",
        text: "Twitter"
    },
    {
        icon: <Message />,
        link: "#",
        text: "Message"
    },
    {
        icon: <Telegram />,
        link: "#",
        text: "Telegram"
    },
    {
        icon: <WhatsApp />,
        link: "#",
        text: "WhatsApp"
    }
]

/**
 * A full-screen above-all panel that provides a user with shareable about a specific business.
 * @param closePanel a callback function that closes the panel
 */
export default function SharePanel({ className, panelState, closePanel }: Props) {

    const [ currentBusiness ] = useAtom(atomCurrentBusiness)
    const [ urlToCopy ] = useAtom(atomURLToCopy)
    const [ shortenURL, setShortenURL ] = useAtom(atomShortenBusinessURL)
    const [ , setWindowUrl ] = useAtom(atomWindowUrl)

    // we update the atom with url manually every time panel is re-rendered,
    // to make sure our url stays up-to-date with any changes in the app
    // since window.location.href is an outside dependency, the component won't automatically re-render on changes to it
    // thus we force it to re-render whenever the panel is closed or open
    useEffect(() => {
        setWindowUrl(window.location.href)
    }, [ panelState, setWindowUrl ])

    const imageSrc = getBusinessProfileImageSrc(currentBusiness)

    return (
        <FullScreenPanel
            className={ twMerge("max-w-md", className) }
            panelState={ panelState }
            closePanel={ closePanel }
            position={ FullScreenPanelPosition.Center}
            title={ strings.businesses.sharePanel.title }
        >
            <div className="flex flex-row gap-4 items-center">
                <div className="relative flex h-16 w-16 rounded-lg">
                    <ImageWithFallback
                        className="max-w-xs object-cover rounded-lg"
                        src={ imageSrc }
                        fill={ true }
                        alt="Business Logo"
                        fallbackImageSrc={ defaults.businesses.gallery.defaultImage }
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <text className="text-base">{ currentBusiness.name }</text>
                    <text className="text-sm">{ currentBusiness.location.address }</text>
                </div>
            </div>
            <hr />
            <div className="flex flex-col">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={ shortenURL }
                                onChange={ e => setShortenURL(e.target.checked) }
                             />
                        }
                        label={ strings.businesses.sharePanel.labelShortenURL }
                    />
                </FormGroup>
            </div>
            <div className="flex flex-row justify-between gap-4">
                <input
                    readOnly
                    className="text-sm focus:outline-none border-ukraine-blue border-2 rounded-lg px-4 bg-inherit"
                    value={ urlToCopy }
                    size={ 25 }
                />
                <Tooltip title={ strings.businesses.sharePanel.tooltipCopy }>
                    <IconButton className="text-ukraine-blue"
                        onClick={ () => {
                            navigator.clipboard.writeText(urlToCopy)
                            toast.success(strings.businesses.sharePanel.toastSuccessCopy)
                        }}
                    >
                        <IconCopy />
                    </IconButton>
                </Tooltip>
            </div>
            {/* TODO: add social sharing */}
            {/* <hr />
            <div className="flex flex-row gap-2 justify-center">
                {
                    socials.map(
                        ({ icon, link, text }, index: number) => (
                            <Link href={ link ?? "" } target="_blank" key={ index }>
                                <Tooltip title={ text ?? "" }>
                                    <IconButton className="hover:text-ukraine-blue">
                                        { icon }
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        )
                    )
                }
            </div> */}
        </FullScreenPanel>
    )
}
