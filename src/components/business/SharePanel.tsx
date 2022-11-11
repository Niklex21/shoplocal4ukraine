import { FullScreenPanelPosition, IconLinkText, PanelState } from "@appTypes/businesses"
import { atomCurrentBusiness, atomSearchQuery, atomSelectedBusinessID, atomSelectedCategories, atomView } from "src/atoms/businesses"
import FullScreenPanel from "@components/common/FullScreenPanel"
import strings from "@utils/strings"
import { atom, useAtom } from "jotai"
import { twMerge } from "tailwind-merge"
import Image from 'next/image'
import defaults, { LOCAL_STORAGE_KEYS } from "@utils/config"
import { CopyAll as IconCopy, Facebook, Instagram, LinkedIn, Message, Telegram, Twitter, WhatsApp } from "@mui/icons-material"
import { Checkbox, FormControlLabel, FormGroup, IconButton, Tooltip } from "@mui/material"
import { atomWithStorage } from "jotai/utils"
import { urlRemoveHash } from "@utils/utils"
import { useEffect } from "react"
import { toast } from "react-toastify"
import Link from "next/link"

type Props = {
    className?: string,
    panelState: PanelState,
    closePanel: () => void,
}

const atomIncludeView = atomWithStorage<boolean>("checkboxIncludeView", true)
const atomIncludeFilters = atomWithStorage<boolean>("checkboxIncludeFilters", true)
// need this to re-render atomURLToCopy on panel close/open
const atomWindowUrl = atom<string>("") 

// builds the current URL to copy based on the modification checkbox statuses
const atomURLToCopy = atom<string>(
    (get) => {
        let url = get(atomWindowUrl)

        if (!get(atomIncludeView)) {
            url = urlRemoveHash(url, LOCAL_STORAGE_KEYS.atomView)
        }

        if (!get(atomIncludeFilters)) {
            url = urlRemoveHash(url, LOCAL_STORAGE_KEYS.atomSearch)
            url = urlRemoveHash(url, LOCAL_STORAGE_KEYS.atomCategories)
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
    const [ includeViewChecked, setIncludeView ] = useAtom(atomIncludeView)
    const [ includeFiltersChecked, setIncludeFilters ] = useAtom(atomIncludeFilters)
    const [ , setWindowUrl ] = useAtom(atomWindowUrl)

    // we update the atom with url manually every time panel is re-rendered,
    // to make sure our url stays up-to-date with any changes in the app
    // since window.location.href is an outside dependency, the component won't automatically re-render on changes to it
    // thus we force it to re-render whenever the panel is closed or open
    useEffect(() => {
        setWindowUrl(window.location.href)
    }, [ panelState, setWindowUrl ])

    const imageSrc = currentBusiness.images && currentBusiness.images.length > 0 ? currentBusiness.images[0] : defaults.businesses.gallery.defaultImage.src

    return (
        <FullScreenPanel
            className={ twMerge("rounded-lg", className) }
            panelState={ panelState }
            closePanel={ closePanel }
            position={ FullScreenPanelPosition.Center}
            title={ strings.businesses.sharePanel.title }
        >
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex h-16 md:h-auto md:w-16 rounded-lg">
                    <Image 
                        className="max-w-xs object-contain"
                        src={ imageSrc }
                        layout="fill"
                        alt="Business Logo"
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
                                checked={ includeFiltersChecked }
                                onChange={ e => setIncludeFilters(e.target.checked) }
                             />
                        }
                        label={ strings.businesses.sharePanel.labelIncludeFilters }
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={ includeViewChecked }
                                onChange={ e => setIncludeView(e.target.checked)}
                            />
                        }
                        label={ strings.businesses.sharePanel.labelIncludeView }
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
            <hr />
            <div className="flex flex-row gap-2">
                {
                    socials.map(
                        ({ icon, link, text }, index: number) => (
                            <Link href={ link }  key={ index }>
                                <a target="_blank">
                                    <Tooltip title={ text }>
                                        <IconButton className="hover:text-ukraine-blue">
                                            { icon }
                                        </IconButton> 
                                    </Tooltip>
                                </a>
                            </Link>
                        )
                    )
                }
            </div>
        </FullScreenPanel>
    )
}