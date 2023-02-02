import { FullScreenPanelPosition, PanelState } from "@appTypes/businesses"
import { SetStateAction } from "jotai"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import Image from 'next/image'
import { links as sections } from "@utils/config"
import Logo from '@public/images/logo.png'
import FullScreenPanel from "@components/common/FullScreenPanel"

type Props = {
    className?: string,
    menuState: PanelState,
    setMenuState: (update: SetStateAction<PanelState>) => void
}

/**
 * The sidebar menu component to display in the app layouts.
 */
 export function AppMenu({ className, menuState, setMenuState }: Props) {

    const title = (
        <div className="grid grid-cols-2 md:grid-cols-3 w-full items-center">
            <div className="flex items-center md:col-span-2 max-w-xs">
                <Image
                    src={ Logo }
                    className="object-contain object-left"
                    alt="Logo"
                />
            </div>
            <span className="col-span-1"></span>
        </div>
    )

    return (
        <FullScreenPanel
            panelState={ menuState }
            closePanel={ () => setMenuState(PanelState.Closed) }
            position={ FullScreenPanelPosition.Left }
            title={ title }
            className={
                // flex overrides "hidden", instead hiding it by movement, thus enabling transitions
                twMerge(
                    "transition-all flex md:max-w-xs overflow-auto gap-16 md:gap-8 p-8 justify-center md:justify-start md:rounded-none text-center md:text-start",
                    menuState === PanelState.Closed ? "hidden md:flex md:-left-full" : "",
                    className
                )
            }
        >
            <hr />
            <div className="flex flex-col gap-16 md:gap-8">
                {
                    sections.map(
                        ({ name, links }) => (
                            <div key={ name } className="flex flex-col gap-4">
                                <text className="font-bold text-2xl md:text-xl">{ name }</text>
                                <div className="flex flex-col gap-3">
                                    {
                                        links.map(
                                            ({ text, link }) => (
                                                <text key={ link } className="text-xl md:text-base cursor-pointer text-gray-700 hover:text-ukraine-blue">
                                                    <Link href={ link }>
                                                        { text }
                                                    </Link>
                                                </text>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </FullScreenPanel>
    )
}
