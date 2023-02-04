import { BusinessCategory, Tag } from '@api/business/types'
import { MapStyle } from '@appTypes/businesses'
import { Section } from '@appTypes/common'
import defaultImage from '@public/images/business_default_image.jpg'
import strings from "@utils/strings"

const defaults = {
    businesses: {
        infoPanel: {
          bleedingArea: 56
        },
        map: {
            zoom: 11,
            longitude: -71.0607281,
            latitude: 42.357916,
            businessViewZoom: 16,
            transitionDuration: 2000,
            mapStyles: {
              [MapStyle.Streets]: "mapbox://styles/shoplocal4ukraine/cl9pxzjw6000p15o28e08i5vl",
              [MapStyle.Satellite]: "mapbox://styles/shoplocal4ukraine/clbeq5esj000114pnz4rofqge"
            },
            categoryIcon: {
              [BusinessCategory.Crafts]: 'art-gallery',
              [BusinessCategory.Groceries]: 'grocery',
              [BusinessCategory.Lifestyle]: 'fitness-centre',
              [BusinessCategory.Restaurant]: 'restaurant',
              [BusinessCategory.Cafe]: 'cafe',
              [BusinessCategory.Services]: 'hardware',
              [BusinessCategory.Shopping]: 'shop',
              [BusinessCategory.Product]: 'shop'
            }
        },
        gallery: {
            defaultImage
        }
    },
    requestTimeout: 5000,
    airtableRequestTimeout: 5000
}

const INFO = {
  email: "shoplocal4ukraine@gmail.com",
  emailLink: "mailto:shoplocal4ukraine@gmail.com"
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
          text: strings.landing.footer.sections.pages.howToSupportUkraine,
          link: '/how-to-support-ukraine'
        },
        {
          text: strings.landing.footer.sections.pages.about,
          link: '/about',
        },
        {
          text: strings.landing.footer.sections.pages.blog,
          link: '/blog'
        },
      ]
    },
    {
      name: strings.landing.footer.sections.socials.name,
      links: [
        {
          text: strings.landing.footer.sections.socials.email,
          link: INFO.emailLink
        },
        {
          text: strings.landing.footer.sections.socials.linkedin,
          link: 'https://www.linkedin.com/company/shop4ua/',
        },
        {
          text: strings.landing.footer.sections.socials.facebook,
          link: 'https://www.facebook.com/shoplocal4ukraine',
        },
        {
          text: strings.landing.footer.sections.socials.instagram,
          link: 'https://www.instagram.com/shop4ukraine/',
        },
        {
          text: strings.landing.footer.sections.socials.telegram,
          link: 'https://t.me/shop4ua',
        }
      ]
    },
]

// stores all possible business categories to be used in rendering
const BUSINESS_CATEGORIES : Array<BusinessCategory> = [
  BusinessCategory.Crafts,
  BusinessCategory.Groceries,
  BusinessCategory.Lifestyle,
  BusinessCategory.Restaurant,
  BusinessCategory.Cafe,
  BusinessCategory.Services,
  BusinessCategory.Shopping,
  BusinessCategory.Product
]

const BUSINESS_TAGS : Array<Tag> = [
  Tag.UkrainianOwned,
  Tag.OnlineOnly
]

// stores the corresponding local storage keys so that they are configurable in one place
const LOCAL_STORAGE_KEYS = {
  atomView: "view",
  atomBusinessId: "business_id",
  atomSearch: "search",
  atomCategories: "categories",
  atomTags: "tags"
}

export default defaults
export { links, BUSINESS_CATEGORIES, LOCAL_STORAGE_KEYS, BUSINESS_TAGS, INFO }
