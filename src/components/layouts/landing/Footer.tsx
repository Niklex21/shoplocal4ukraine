import strings from "@utils/strings";
import Link from "next/link";
import Image from 'next/image';
import logo from "@public/images/logo.png"
import { ButtonSecondary } from "@components/common/buttons";
import { Email, Facebook, Instagram, LinkedIn, Message, Phone, Telegram, Twitter, WhatsApp } from "@mui/icons-material"
import { links as sections } from "@utils/config"
import { IconLinkText } from "@appTypes/businesses";
import { Tooltip, IconButton } from "@mui/material";

const socials : Array<IconLinkText> = [
  {
    icon: <Phone />,
    link: "tel:+13395451405",
    text: "+13395451405"
  },
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
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-6 mb-8 col-span-2">
          <div className="flex h-16 w-1/3 relative">
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
          <div className="flex w-full mt-8">
            {/* <!-- Begin Mailchimp Signup Form --> */}
            <div id="mc_embed_signup w-full">
                <form action="https://app.us13.list-manage.com/subscribe/post?u=5294169e3c5e26832ef9cc671&amp;id=e8434e936c&amp;f_id=004490e2f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate flex flex-col gap-2 w-full" target="_blank">
                    <div id="mc_embed_signup_scroll">
                      <h2 className="text-oxford-blue text-xl font-bold">{ strings.landing.footer.subscriptionForm.subscribe }</h2>
                    </div>
                    <div className="flex flex-row w-full gap-2">
                      <div className="mc-field-group flex flex-col gap-1 w-full">
                        <input type="email" name="EMAIL" className="required email bg-white ring-1 w-80 ring-ukraine-blue focus:outline-ukraine-blue rounded px-4 py-2" id="mce-EMAIL" required placeholder="email@example.com" />
                        <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
                      </div>
                      <div id="mce-responses" className="clear foot">
                        <div className="response" id="mce-error-response" style={{ display:"none" }}></div>
                        <div className="response" id="mce-success-response" style={{ display:"none" }}></div>
                      </div>
                      {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
                        <input type="text" name="b_5294169e3c5e26832ef9cc671_e8434e936c" tabIndex={-1} value="" />
                      </div>
                      <div className="optionalParent">
                          <div className="clear foot">
                              <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button px-4 py-2 rounded-full bg-ukraine-blue text-white font-bold cursor-pointer hover:bg-ukraine-yellow hover:text-oxford-blue hover:drop-shadow-button" value={ strings.landing.footer.subscriptionForm.subscribeButton } />
                          </div>
                      </div>
                    </div>
                </form>
            </div>
          </div>
        </div>
        <div className="hidden lg:block"></div>
        <div className="flex flex-col gap-8 col-span-2">
          <div className="grid grid-rows-1 grid-flow-col gap-8 md:gap-16">
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
            <div className="flex flex-col gap-4">
              <text className="font-bold text-xl">{ strings.landing.footer.sections.socials.name }</text>
              {
                  socials.map(
                      ({ icon, link, text }, index: number) => (
                          <Link href={ link ?? "" } target="_blank" key={ index }>
                              <span className="flex flex-row gap-2 hover:text-ukraine-blue text-base cursor-pointer text-gray-700">
                                { icon }
                                { text }
                              </span>
                          </Link>
                      )
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
