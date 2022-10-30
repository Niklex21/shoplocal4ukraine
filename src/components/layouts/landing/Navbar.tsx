import Image from 'next/image'
import Logo from '@public/images/logo.png'
import Link from 'next/link'
import strings from '@utils/strings'

type Link = {
  text: string,
  link: string,
  active?: boolean
}

const links: Array<Link> = [
  {
    text: strings.landing.navbar.businesses,
    link: '/businesses'
  },
  {
    text: strings.landing.navbar.about,
    link: '/about'
  },
  {
    text: strings.landing.navbar.privacyStatement,
    link: '/privacy'
  },
  {
    text: strings.landing.navbar.join,
    link: '/join'
  }
]

/**
 * Renders a navbar with an active link.
 * @param current the link (url) of the currently active page
 * @returns the navbar
 */
export default function Navbar({ current }: { current: string }) {
  return (
    <div className="fixed justify-around w-full h-48 left-0 top-0 py-2 px-4">
      <Image
        src={ Logo }
        className="w-48 h-24 m-auto"
        alt="Logo"
      />
      <div className="flex justify-end gap-4 last:border-1px last:rounded-lg last:border-ukraine-yellow">
        {
          links.map(
            ({ text, link }: Link, index: number) => (
              <span key={ index } className={ `font-lg cursor-pointer hover:text-ukraine-blue ${ current === link ? "text-ukraine-blue" : "" }` }>
                <Link href={ link }>{ text }</Link>
              </span>
            )
          )
        }
      </div>
    </div>
  )
}