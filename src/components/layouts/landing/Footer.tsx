import strings from "@utils/strings";
import Link from "next/link";
import Image from 'next/image';
import logo from "@public/images/logo.png"
import { ButtonSecondary } from "@components/common/buttons";
import { Email, Facebook, Instagram, LinkedIn, Message, Telegram, Twitter, WhatsApp } from "@mui/icons-material"
import { links as sections } from "@utils/config"
import { IconLinkText } from "@appTypes/businesses";
import { Tooltip, IconButton } from "@mui/material";

const socials : Array<IconLinkText> = [
  {
    icon: <Email />,
    link: "mailto:shoplocal4ukraine@gmail.com",
    text: "shoplocal4ukraine@gmail.com"
  },
  {
      icon: <LinkedIn />,
      link: "https://www.linkedin.com/company/shop4ua/",
      text: "LinkedIn"
  },
  {
      icon: <Facebook />,
      link: "https://www.facebook.com/shoplocal4ukraine",
      text: "Facebook"
  },
  {
      icon: <Instagram />,
      link: "https://www.instagram.com/shop4ukraine/",
      text: "Instagram"
  },
  {
      icon: <Telegram />,
      link: "https://t.me/shop4ua",
      text: "Telegram"
  },
]

export default function Footer() {
  return (
    <footer className="w-full flex p-8 md:p-16 flex-col gap-8 md:gap-16 bg-alice-blue">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <text className="flex text-3xl font-bold">
          { strings.landing.footer.callAction }
        </text>
        <Link href="/join">
          <ButtonSecondary text={ strings.landing.footer.callButton } />
        </Link>
      </div>
      <hr />
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex h-16 w-full relative">
            <Link href="/">
              <Image
                src={ logo }
                alt="logo"
                fill={ true }
                className="object-contain object-left cursor-pointer"
              />
            </Link>
          </div>
          <text className="text-lg max-w-xs lg:max-w-none">{ strings.landing.footer.descriptionText }</text>
          <div className="flex flex-row gap-2">
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
          </div>
        </div>
        <div className="hidden lg:block"></div>
        <div className="grid grid-rows-1 grid-flow-col gap-8 md:gap-4">
          {/* TODO: feedback */}
          {
            sections.map(
              ({ name, links }) => (
                <div key={ name } className="flex flex-col gap-4">
                  <text className="font-bold text-xl">{ name }</text>
                  <div className="flex flex-col gap-4">
                    {
                      links.map(
                        ({ text, link }) => (
                          <text key={ link } className="text-base cursor-pointer text-gray-700 hover:text-ukraine-blue">
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
      </div>
    </footer>
  );
}
