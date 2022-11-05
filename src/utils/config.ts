import { Section } from '@appTypes/common'
import defaultImage from '@public/images/business_default_image.jpg'
import strings from "@utils/strings"

const defaults = {
    businesses: {
        map: {
            zoom: 11,
            longitude: -71.0607281,
            latitude: 42.357916
        },
        gallery: {
            defaultImage
        }
    },
}

const links : Array<Section> = [
    {
      name: strings.landing.footer.sections.pages.name,
      links: [
        {
          text: strings.landing.footer.sections.pages.home,
          link: "/"
        },
        {
          text: strings.landing.footer.sections.pages.businesses,
          link: '/businesses',
        },
        {
          text: strings.landing.footer.sections.pages.about,
          link: '/about',
        },
        {
          text: strings.landing.footer.sections.pages.join,
          link: '/join',
        }
      ]
    },
    {
      name: strings.landing.footer.sections.socials.name,
      links: [
        {
          text: strings.landing.footer.sections.socials.email,
          link: "mailto:shoplocal4ukraine@gmail.com"
        },
        {
          text: strings.landing.footer.sections.socials.linkedin,
          link: '#',
        },
        {
          text: strings.landing.footer.sections.socials.facebook,
          link: '#',
        },
        {
          text: strings.landing.footer.sections.socials.instagram,
          link: '#',
        },
        {
          text: strings.landing.footer.sections.socials.twitter,
          link: '#',
        }
      ]
    },
]

export default defaults
export { links }