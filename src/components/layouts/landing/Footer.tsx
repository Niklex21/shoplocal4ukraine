import strings from "@utils/strings";
import Link from "next/link";
import Image from 'next/image';
import logo from "@public/images/logo.png"
import { ButtonSecondary } from "@components/common/buttons";
import { links as sections } from "@utils/config"

export default function Footer() {
  return (
    <footer className="w-full flex p-8 md:p-16 flex-col gap-16 md:bg-gradient-radial from-ukraine-yellow to-white gradient-stop-50 bg-bottom-edge bg-size-2x">
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
          <div className="h-16 flex">
            <Link href="/">
              <Image
                src={ logo }
                alt="logo"
                className="object-contain object-left cursor-pointer"
              />
            </Link>
          </div>
          <text className="text-lg max-w-xs lg:max-w-none">{ strings.landing.footer.descriptionText }</text>
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
