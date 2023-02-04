import Image from 'next/image'
import Logo from '@public/images/logo.png'
import LogoNoText from '@public/images/logoNoText.png'
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
        <div className="flex h-full w-full relative">
          <Link href="/">
            <Image
              src={ Logo }
              fill={ true }
              className="hidden xl:flex object-contain cursor-pointer object-left"
              alt="Logo"
            />
            <Image
              src={ LogoNoText }
              fill={ true }
              className="flex xl:hidden object-contain cursor-pointer object-left"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="justify-end flex gap-6 lg:gap-10 items-center shrink-0">
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
      <div className="flex md:hidden relative z-40 h-24 p-6 w-full top-0 left-0 bg-white drop-shadow-sm justify-between">
        <div className="flex h-full w-full relative">
          <Image
            src={ Logo }
            fill={ true }
            className="flex xl:hidden object-contain object-left"
            alt="Logo"
          />
        </div>
        <IconButton onClick={ () => setMenuState(PanelState.Open) }>
          <IconMenu className="text-oxford-blue text-5xl" />
        </IconButton>
      </div>
      <AppMenu className="fixed" menuState={ menuState } setMenuState={ setMenuState } />
    </>
  )
}
