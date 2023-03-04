import { BusinessCategory, Tag } from '@api/business/types';
import {
    AutocompleteSuggestionCategory,
    IconLinkText,
    MapStyle,
} from '@appTypes/businesses';
import { Section } from '@appTypes/common';
import {
    Category,
    Email,
    Facebook,
    Instagram,
    Label,
    LinkedIn,
    Phone,
    Place,
    Telegram,
} from '@mui/icons-material';
import defaultImage from '@public/images/business_default_image.jpg';
import strings from '@utils/strings';

const defaults = {
    businesses: {
        infoPanel: {
            bleedingArea: 56,
        },
        map: {
            zoom: 11,
            longitude: -71.0607281,
            latitude: 42.357916,
            businessViewZoom: 16,
            transitionDuration: 2000,
            mapStyles: {
                [MapStyle.Streets]:
                    'mapbox://styles/shoplocal4ukraine/cl9pxzjw6000p15o28e08i5vl',
                [MapStyle.Satellite]:
                    'mapbox://styles/shoplocal4ukraine/clbeq5esj000114pnz4rofqge',
            },
            categoryIcon: {
                [BusinessCategory.CafeAndBakery]: 'cafe',
                [BusinessCategory.Education]: 'college',
                [BusinessCategory.FoodAndBeverage]: 'convenience',
                [BusinessCategory.Dining]: 'restaurant',
                [BusinessCategory.ArtsAndEntertainment]: 'art-gallery',
                [BusinessCategory.CommunityAndReligion]: 'place-of-worship',
                [BusinessCategory.Shopping]: 'shop',
                [BusinessCategory.HomeServices]: 'hardware',
                [BusinessCategory.OtherServices]: 'laundry',
                [BusinessCategory.HealthAndWellness]: 'fitness-centre'
            },
        },
        gallery: {
            defaultImage,
        },
    },
    requestTimeout: 5000,
    airtableRequestTimeout: 5000,
};

const INFO = {
    email: 'shoplocal4ukraine@gmail.com',
    emailLink: 'mailto:shoplocal4ukraine@gmail.com',
};

const links: Array<Section> = [
    {
        name: strings.landing.footer.sections.pages.name,
        links: [
            {
                text: strings.landing.footer.sections.pages.home,
                link: '/',
            },
            {
                text: strings.landing.footer.sections.pages.businesses,
                link: '/businesses',
            },
            {
                text: strings.landing.footer.sections.pages.howToSupportUkraine,
                link: 'https://www.notion.so/shop4ua/Guide-for-Local-Businesses-on-Supporting-Ukraine-60bceb5aa5f2455fa4debe82d0aaf15e?pvs=4',
            },
            {
                text: strings.landing.footer.sections.pages.about,
                link: '/about',
            },
            {
                text: strings.landing.footer.sections.pages.join,
                link: '/join',
            },
        ],
    },
];

const socials: Array<IconLinkText> = [
    {
        iconSVG: Phone,
        link: 'tel:+13395451405',
        text: '+1 (339) 545-1405',
    },
    {
        iconSVG: Email,
        link: 'mailto:shoplocal4ukraine@gmail.com',
        text: 'Email',
    },
    {
        iconSVG: LinkedIn,
        link: 'https://www.linkedin.com/company/shop4ua/',
        text: 'LinkedIn',
    },
    {
        iconSVG: Facebook,
        link: 'https://www.facebook.com/shoplocal4ukraine',
        text: 'Facebook',
    },
    {
        iconSVG: Instagram,
        link: 'https://www.instagram.com/shop4.ua/',
        text: 'Instagram',
    },
    {
        iconSVG: Telegram,
        link: 'https://t.me/shop4ua',
        text: 'Telegram',
    },
];

// stores all possible business categories to be used in rendering
const BUSINESS_CATEGORIES: Array<BusinessCategory> = [
    BusinessCategory.CafeAndBakery,
    BusinessCategory.Education,
    BusinessCategory.FoodAndBeverage,
    BusinessCategory.Dining,
    BusinessCategory.ArtsAndEntertainment,
    BusinessCategory.CommunityAndReligion,
    BusinessCategory.Shopping,
    BusinessCategory.HomeServices,
    BusinessCategory.OtherServices,
    BusinessCategory.HealthAndWellness
];

const BUSINESS_TAGS: Array<Tag> = [
    Tag.LeadSupporter,
    Tag.OnRequest,
    Tag.Online,
    Tag.SellUkrainianProducts,
    Tag.UkrainianOwned
];

// stores the corresponding local storage keys so that they are configurable in one place
const LOCAL_STORAGE_KEYS = {
    atomView: 'view',
    atomBusinessId: 'business_id',
    atomSearch: 'search',
    atomCategories: 'categories',
    atomTags: 'tags',
    atomSearchHistory: 'search_history',
};

export default defaults;
export {
    links,
    socials,
    BUSINESS_CATEGORIES,
    LOCAL_STORAGE_KEYS,
    BUSINESS_TAGS,
    INFO,
};
