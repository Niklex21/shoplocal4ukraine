import { ReactElement, ReactNode } from "react";
import { NextPageWithLayout } from "./_app";

import { LandingLayout } from "@layouts/landing";
import heroImage from "@public/images/map_screenshot.png"
import logo from "@public/images/logo_white.png"
import Link from "next/link"
import strings from "@utils/strings"
import { ButtonSecondary } from "@components/common/buttons";
import { ArrowBack as IconArrowBack, ArrowForward as IconArrowForward, Email, Facebook, Instagram, LinkedIn, MoneyOff as IconMoneyOff, Telegram, Verified as IconVerified, VolunteerActivism as IconVolunteerActivism } from "@mui/icons-material";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import Image from "next/image"
import "pure-react-carousel/dist/react-carousel.es.css";
import { IconButton } from "@mui/material";
import { isMobile } from "react-device-detect";
import ImageWithFallback from "@components/common/ImageWithFallback";

type Benefit = {
  icon: ReactNode,
  title: string,
  description: string
}

const BENEFIT_ICON_SIZE = "text-6xl"

const benefits : Array<Benefit> = [
  {
    icon: (<IconVolunteerActivism className={ BENEFIT_ICON_SIZE } />),
    title: strings.landing.home.benefits.support.title,
    description: strings.landing.home.benefits.support.description
  },
  {
    icon: (<IconVerified className={ BENEFIT_ICON_SIZE } />),
    title: strings.landing.home.benefits.verified.title,
    description: strings.landing.home.benefits.verified.description
  },
  {
    icon: (<IconMoneyOff className={ BENEFIT_ICON_SIZE } />),
    title: strings.landing.home.benefits.free.title,
    description: strings.landing.home.benefits.free.description
  }
]

const Home: NextPageWithLayout = () => {

  return (
    <div className="flex flex-col w-full gap-8">

      <div className="flex w-full md:grid grid-cols-3 p-8 md:p-32">
        <div className="col-span-2 flex align-middle flex-col gap-16">
          <div className="text-4xl md:text-7xl font-bold flex flex-col gap-4">
            <text className="text-ukraine-blue">{ strings.landing.home.taglineBlue }</text>
            <text className="text-logo-yellow">{ strings.landing.home.taglineYellow }</text>
          </div>
          <text className="text-lg md:text-xl max-w-lg">{ strings.landing.home.extendedTagline }</text>
        </div>
        <div>

        </div>
      </div>

      {/* HERO SECTION */}
      <div className="flex flex-col w-full items-center bg-fixed bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${ heroImage.src }`}}>
        <div className="flex flex-col backdrop-blur-sm backdrop-brightness-50 p-8 md:p-32 w-full justify-center">
          <div className="flex flex-col md:mx-auto">
            <text className="mt-64 max-w-xs md:max-w-none md:mt-0 text-4xl md:text-7xl text-white font-bold leading-tight">{ strings.landing.home.callPrimary }</text>
            <text className="text-lg md:text-2xl text-white mt-8 max-w-xl font-medium leading-normal">{ strings.landing.home.callSecondary }</text>
            <div className="mt-10 flex gap-4">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/businesses">
                <ButtonSecondary text={ strings.landing.home.discoverBusinesses } className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFITS SECTION */}
      <div className="flex w-full items-center p-8 md:px-32 md:py-16">
        <div className="md:grid md:grid-cols-3 gap-16 flex flex-col mx-auto">
          {
            benefits.map(
              ({ icon, title, description } : Benefit, index) => (
                <div className="flex flex-col max-w-sm gap-4" key={ index }>
                  <div className="text-ukraine-blue">{ icon }</div>
                  <p className="text-2xl font-bold">{ title }</p>
                  <p className="text-lg">{ description }</p>
                </div>
              )
            )
          }
        </div>
      </div>

      {/* FEATURED BUSINESSES SECTION */}
      <div className="flex-col w-full p-8 md:px-32 md:py-16">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight text-black px-4 py-2 before:block before:absolute before:-skew-x-12 before:-inset-1 before:bg-ukraine-yellow relative inline-block"><span className="text-black relative">{ strings.landing.home.featured.title }</span></h1>
        <CarouselProvider
          naturalSlideHeight={ 100 }
          naturalSlideWidth={ 100 }
          isIntrinsicHeight={ true }
          totalSlides={ 3 }
          className="md:px-16 md:mt-10"
          visibleSlides={ isMobile ? 1 : 3 }
        >
          <Slider>
            {
              strings.landing.home.featured.businesses.map(
                ({ image, name, category, description, link }, index) => (
                  <Slide index={ index } key={ index }>
                    <div className="flex flex-col max-w-sm gap-2 py-16 w-full">
                      <div className="flex relative w-full h-64 rounded-lg">
                        <a href={ link }>
                          <ImageWithFallback src={image.src} fill={ true } className="object-cover cursor-pointer hover:brightness-105 shadow-md rounded-md" alt="Business Profile Picture" />
                        </a>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl hover:text-ukraine-blue"><Link href={ link }>{ name }</Link></span>
                        <p className="text-gray-700">{ category }</p>
                      </div>
                      <p className="prose line-clamp-2">{ description }</p>
                      <span className="underline italic hover:text-ukraine-blue"><Link href={ link }>{ strings.landing.home.featured.readMore }</Link></span>
                    </div>
                  </Slide>
                )
              )
            }
          </Slider>

          <div className="flex items-center">
              <ButtonBack className="cursor-pointer " role="button" aria-label="previous slide">
                  <IconButton>
                    <IconArrowBack className="hover:text-ukraine-blue" />
                  </IconButton>
              </ButtonBack>

              <ButtonNext role="button" aria-label="next slide" className="cursor-pointer ml-2">
                <IconButton>
                  <IconArrowForward className="hover:text-ukraine-blue" />
                </IconButton>
              </ButtonNext>
          </div>
        </CarouselProvider>
      </div>

      {/* TESTIMONIAL SECTION */}
      {/* <div className="flex-col w-full p-8 md:px-32 md:py-16">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight px-4 py-2 before:block before:absolute before:-skew-x-12 before:-inset-1 before:bg-ukraine-yellow relative inline-block"><span className="text-black relative">{ strings.landing.home.testimonials.title }</span></h1>
        <CarouselProvider
          naturalSlideWidth={ 100 }
          isIntrinsicHeight={ true }
          totalSlides={ strings.landing.home.testimonials.slides.length }
          naturalSlideHeight={100}
          className="md:px-16 md:mt-10"
          isPlaying={ true }
          infinite={ true }
        >
            <Slider>
              {
                strings.landing.home.testimonials.slides.map(
                  ({ name, title, text, image }, index) => (
                    <Slide index={ index } key={ index } >
                      <div className="flex w-full">
                          <div className="md:py-16 flex flex-col md:grid md:grid-cols-2">
                              <div className="relative hidden md:flex">
                                  <ImageWithFallback src={ image.src } fill={ true } alt="Profile photo" className="w-full h-full flex-shrink-0 object-fit object-cover shadow-lg rounded" />
                                  <div className="w-32 md:flex hidden items-center justify-center absolute top-0 -mr-16 -mt-14 right-0 h-32 bg-indigo-100 rounded-full">
                                      <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonial-svg1.svg" alt="commas" />
                                  </div>
                              </div>
                              <div className="md:pl-32 flex flex-col justify-between py-16 w-full">
                                  <div>
                                      <p className="text-xl font-medium leading-normal prose max-w-prose">{ text }</p>
                                  </div>
                                  <div className="flex flex-col mt-8 gap-2 justify-center w-full md:justify-left ">
                                      <div className="flex relative md:hidden w-32 h-32">
                                        <ImageWithFallback src={ image.src } fill={ true } alt="Profile photo" className="w-full h-full flex-shrink-0 object-fit object-cover shadow-lg rounded" />
                                      </div>
                                      <div>
                                        <p className="font-medium text-xl">{ name }</p>
                                        <p className="text-base text-gray-600">{ title }</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Slide>
                  )
                )
              }
            </Slider>
            <div className="flex items-center">
                <ButtonBack className="cursor-pointer " role="button" aria-label="previous slide">
                    <IconButton>
                      <IconArrowBack className="hover:text-ukraine-blue" />
                    </IconButton>
                </ButtonBack>

                <ButtonNext role="button" aria-label="next slide" className="cursor-pointer ml-2">
                  <IconButton>
                    <IconArrowForward className="hover:text-ukraine-blue" />
                  </IconButton>
                </ButtonNext>
            </div>
        </CarouselProvider>
      </div> */}
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <LandingLayout>
      { page }
    </LandingLayout>
  )
}

export default Home
