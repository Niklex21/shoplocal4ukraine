import Image from 'next/image'
import Logo from '@public/images/logo.png'
import Link from 'next/link'
import strings from '@utils/strings'
import { Page, Link as LinkType } from '@appTypes/landing'
import { ButtonPrimary } from '@components/common/buttons'
import { IconButton } from '@mui/material'
import { Menu as IconMenu } from '@mui/icons-material'
import { AppMenu } from '@components/common/AppMenu'
import { PanelState } from '@appTypes/businesses'
import { useState } from 'react'

const links: Array<LinkType> = [
  {
    text: strings.landing.navbar.businesses,
    link: '/businesses',
  },
  {
    text: strings.landing.navbar.howToSupportUkraine,
    link: '/how-to-support-ukraine',
    page: Page.HowToSupport
  },
  {
    text: strings.landing.navbar.about,
    link: '/about',
    page: Page.About
  },
  {
    text: strings.landing.navbar.blog,
    link: '/blog',
    page: Page.Blog
  },
  {
    text: strings.landing.navbar.join,
    link: '/join',
    page: Page.Join
  }
]

/**
 * Renders a navbar with an active link.
 * @param current the link (url) of the currently active page
 * @returns the navbar
 */
export default function Navbar({ current }: { current: Page }) {

  const [ menuState, setMenuState ] = useState<PanelState>(PanelState.Closed)

  return (
    <>
      <div className="hidden md:flex sticky flex-row justify-between w-full h-24 left-0 top-0 py-6 px-16 bg-white drop-shadow-sm z-10">
        <Link href="/">
          <Image
            src={ Logo }
            className="object-contain cursor-pointer object-left"
            alt="Logo"
          />
        </Link>
        <div className="justify-end flex gap-2 lg:gap-12 items-center">
          {
            links.map(
              ({ text, link, page }: LinkType, index: number) => (
                <span
                  key={ index }
                  className={ `font-lg text-center cursor-pointer hover:text-ukraine-blue ${ current === page ? "text-ukraine-blue" : "" }` }>
                  <Link href={ link }>
                    {
                      index === links.length - 1 ? ButtonPrimary(text) : text
                    }
                  </Link>
                </span>
              )
            )
          }
        </div>
      </div>
      <div className="flex md:hidden absolute z-40 h-24 w-24 top-0 right-0">
        <IconButton onClick={ () => setMenuState(PanelState.Open) }>
          <IconMenu className="text-white text-5xl" />
        </IconButton>
      </div>
      <AppMenu className="fixed" menuState={ menuState } setMenuState={ setMenuState } />
    </>
  )
}
