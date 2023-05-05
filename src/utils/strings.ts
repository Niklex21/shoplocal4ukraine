import defaultImage from '@public/images/flag.jpg'
import solodko from '@public/images/featured/solodko.png'
import galaxyKitchen from '@public/images/featured/galaxy_kitchen.jpg'
import estheticBean from '@public/images/featured/esthetic_bean.jpg'
import { BusinessCategory, Tag } from '@api/business/types';
import { DarkModeOptions } from '@appTypes/common';


const strings_en = {
    all: {
        title: 'Shop 4 UA',
        genericError: "Sorry, something went wrong.",
        reportError: "Report a problem with the website",
        pages: {
            home: 'Home'
        },
        giveFeedback: {
            full: "Give feedback/report a bug",
            short: "Feedback"
        },
        error: {
            goHome: "Go home"
        },
        meta: {
            description: "Shop local to support Ukraine."
        }
    },
    app: {
        tooltipMenuButton: 'Menu',
        tooltipClearSearch: "Clear search",
        errors: {
            fieldRequired: 'This field is required',
        },
        submit: 'Submit',
        feedbackReport: {
            bug: 'Bug',
            suggestion: 'Suggestion'
        },
        mobileMenu: {
            menu: "Menu",
            add: "Add a business",
            feedback: "Feedback"
        },
        darkMode: {
            scheme: "Color scheme",
            tooltips: {
                [DarkModeOptions.Light]: "Light mode",
                [DarkModeOptions.System]: "Same as system",
                [DarkModeOptions.Dark]: "Dark mode",
            }
        }
    },
    landing: {
        join: {
            title: "Join"
        },
        privacy: {
            title: "Privacy Statement"
        },
        about: {
            title: "About",
            advisorsSectionTitle: "Advisors",
            teamSectionTitle: 'The team',
            socials: {
                email: 'Email',
                linkedin: 'LinkedIn',
                facebook: 'Facebook',
                instagram: 'Instagram',
                twitter: 'Twitter',
                behance: 'Behance',
                website: 'Website',
                github: 'GitHub'
            },
            communityTeamSectionTitle: "With help from",
            whoWeAre: {
                title: "Who we are",
                mission: {
                    m1: "Supporting Ukraine should be",
                    h1: "simple and cost-free",
                    m2: ". We are",
                    h2: "Boston-based students",
                    m3: "with a mission to help",
                    h3: "Ukraine-supporting businesses",
                    m4: "in your area."
                }
            },
            whyWeDoIt: {
                title: "Why we do it",
                content: "We are Ukrainian students living in Boston while our home country is going through war. It means a lot to us when local businesses and Bostonians support our Ukrainian community through small but meaningful actions.However, such help often comes at a cost to business owners, which makes their support even more valuable. \n\nShop4UA is created by us, the Ukrainian students, to support the local businesses that are standing with us in the fight for Freedom and Peace. \n\nSupporting Ukraine should not come at a cost, and Shop4UA is born to make that happen."
            },
            howThisWorks: {
                title: "How this works",
                customer: {
                    title: "Customer",
                    text: "Through our app, you have access to a map highlighting businesses around you that support Ukraine. Whether you are looking for a hotel, a coffee shop, or a gym — we've got you covered!"
                },
                business: {
                    title: "Business",
                    text: "Want to help Ukraine but not sure where to start? We want to give you a hand in brainstorming and promoting your support! If you are a business that already supports Ukraine, we want to promote you and your initiatives to the Ukrainian community and Ukraine-supporters in Boston."
                }
            },
            faq: {
                title: "FAQ",
                toggles: [
                    {
                        question: 'How do you define "business that supports Ukraine"?',
                        answer: `We leave it at our own discretion to determine whether or not a business supports Ukraine. Each evaluation is performed by one of our team members, and all decisions are made on a case-by-case basis. All businesses that we display contain a short descriptions of their contributions that let them qualify as "Ukraine supporters". Most common way a business can support Ukraine is donate cash or goods to a local nonprofit or community event, but support is not only limited to donations!`,
                        linkText: "Read more here about how local businesses can support Ukraine and the Ukrainian community.",
                        link: "https://shop4ua.notion.site/Guide-for-Local-Businesses-on-Supporting-Ukraine-60bceb5aa5f2455fa4debe82d0aaf15e"
                    },
                    {
                        question: "How do you verify businesses?",
                        answer: "The verification of support is done on a case-by-case basis. First, we identify businesses by talking to community members, local Ukrainian nonprofits, local news papers, and internet searches. Then, we proceed to document proof of support, usually in a form of a social media post, a news article, or business statement on their website. The proof and description of the business’ initiative is added to our database, which will be reviewed by our editor prior to being published."
                    },
                    {
                        question: "How do you select featured businesses?",
                        answer: "Featured businesses are displayed on Shop4UA's landing page and introduced in our newsletter and social media. The selection of a business to feature is decided on a case-by-case basis. We aim to feature businesses that have an active initiative for Ukraine, such as a fundraiser or a community event, but we can also feature new businesses that are Ukraine-owned or support our cause. Please let us know via email if you want to nominate your or someone’s business to be featured!"
                    },
                    {
                        question: "What if I know a businesses that I think should be on the website?",
                        answer: "Tell us about them! You can add the business yourself here or send us a brief email with some basic information about the business and why you think they should be on Shop4UA. Thank you for your contribution!",
                        linkText: "Add a business here",
                        link: "https://www.shop4ua.com/join"
                    },
                    {
                        question: "I have other questions. How do I get in contact with you?",
                        answer: "We are happy to hear from you!",
                        linkText: "Check out our contacts below.",
                        link: "#contacts",
                        linkNoBlank: true
                    }
                ]
            },
            roadmap: {
                title: "Roadmap"
            },
            wantToWorkWithUs: {
                title: "Let's get in touch!",
                text1: "We need any possible help to grow Shop4UA! Interested in joining our team? Find our open positions",
                openPositionsLinkText: "here",
                text2: "or shoot us an email at",
                text3: "with a brief note about you and how you can help our mission.",
                text4: "We always looking for collaborations and connections with local businesses, community members, and nonprofits. Let's get in touch!"
            },
            supportedByTitle: "Supported by"
        },
        home: {
            callPrimary: 'Shop Local, Support Ukraine',
            callSecondary:
                'Discover local businesses around you and support Ukraine by supporting them.',
            categoriesLabel: 'Categories',
            onlyUkrainianOwnedLabel: 'Only Ukrainian-Owned',
            locationFieldLabel: 'Enter your location...',
            searchButtonLabel: 'Search',
            discoverBusinesses: "Discover businesses",
            benefits: {
                free: {
                    title: "Free",
                    description: "Shop4UA is born to support local business and community. Businesses do not have to pay anything to be featured and promoted on our platform, and customers browse our site with no ads and fees."
                },
                verified: {
                    title: "Verified",
                    description: "All businesses on our list undergo a rigorous verification process, so you can be sure that your money goes to the right place."
                },
                support: {
                    title: "Support Ukraine",
                    description: "By shopping with Ukrainian-supporting or Ukrainian-owned businesses, you are supporting the local Ukrainian community and our fight for Freedom and Peace."
                }
            },
            testimonials: {
                title: "What our customers are saying",
                slides: [
                    {
                        name: "John Doe",
                        title: "Developer",
                        text: "Stuff I said interesting stuff Stuff I said interesting stuff Stuff I said interesting stuff Stuff I said interesting stuff Stuff I said interesting stuff Stuff I said interesting stuff Stuff I said interesting stuff",
                        image: defaultImage
                    },
                    {
                        name: "John Doe",
                        title: "Developer",
                        text: "Stuff I said interesting stuff Stuff I said interesting stuff Stuff I said interesting stuff Stuff I said interesting stuff Stuff I said interesting stuff Stuff I said interesting stuff Stuff I said interesting stuff",
                        image: defaultImage
                    }
                ]
            },
            featured: {
                title: "Featured businesses",
                readMore: "Read more...",
                businesses: [
                    {
                        image: solodko,
                        name: "Solodko Boston",
                        category: "Cafe",
                        description: "Ukrainian-owned cafe in Brighton, MA, with excellent pastries and custom cakes.",
                        link: '/businesses#business_id="recDKndwX1LT0IZCF"'
                    },
                    {
                        image: galaxyKitchen,
                        name: "Galaxy Kitchen",
                        category: "Services",
                        description: "Ukrainian-owned business dedicated to help you find the optimal kitchen solutions.",
                        link: '/businesses#business_id="recIe3T4qOk3t4d2z"'
                    },
                    {
                        image: estheticBean,
                        name: "Esthetic Bean",
                        category: "Cafe",
                        description: "A Ukrainian-owned bakery with a warm-hearted atmosphere.",
                        link: '/businesses#business_id="recSKQUgGhsdJ6LEv"'
                    }
                ]
            }
        },
        navbar: {
            businesses: 'Discover Businesses',
            howToSupportUkraine: "Business Resources",
            about: 'About Us',
            privacyStatement: 'Privacy Statement',
            join: 'Add A Business',
            blog: "Blog"
        },
        footer: {
            callAction: 'Shop Local, Support Ukraine',
            callButton: 'Add A Business',
            descriptionText: 'Discover local businesses that support Ukraine.',
            sections: {
                pages: {
                    name: 'Pages',
                    home: 'Home',
                    businesses: 'Discover Businesses',
                    about: 'About Us',
                    privacyStatement: 'Privacy Statement',
                    join: 'Add A Business',
                    blog: "Blog",
                    howToSupportUkraine: "Business Resources"
                },
                socials: {
                    name: 'Contact us',
                    email: 'Email',
                    linkedin: 'LinkedIn',
                    facebook: 'Facebook',
                    instagram: 'Instagram',
                    twitter: 'Twitter',
                    telegram: 'Telegram'
                },
            },
            subscriptionForm: {
                subscribe: "Subscribe to our newsletter",
                subscribeButton: "Subscribe"
            }
        },
    },
    businesses: {
        pageTitle: "Businesses",
        tipOnlyOnline: "Tip: business that don't have a physical location and operate only online are only visible from the Gallery View!",
        infoPage: {
            addSuggestEdit: "Add info/suggest an edit",
            sectionTitle: {
                description: 'About',
                contributions: 'How they helped',
                contacts: 'Contacts',
            },
            tooltipShare: 'Share',
            tooltipCopy: 'Copy',
            tooltipCopyGoogleMapsURL: 'Copy Google Maps link',
            tooltipOpenPanel: "Expand info panel",
            tooltipClosePanel: "Collapse info panel",
            tooltipReport: 'Report this business',
            tooltipAddress: "address",
            tooltipEmail: "email",
            tooltipWebsite: "website",
            tooltipPhone: "phone",
            googleMapsURLText: 'Open on Google Maps',
            online: "Online"
        },
        businessView: {
            titleViewMap: 'Map',
            titleViewGallery: 'Gallery',
            categorySelectLabel: 'Select categories',
            tagSelectLabel: 'Select tags',
            tooltipAddBusiness: 'Add a business',
            show: 'Show',
            searchBar: {
                tooltipSearchIcon: "Search",
                tooltipClearIcon: "Clear search",
                placeholder: "Search businesses",
                nothingFound: "Add a missing place",
                filters: {
                    title: "Filters applied: ",
                    categoryTitle: "Categories (either one)",
                    tagsTitle: "Tags (either one)",
                    and: "and",
                    clearAll: "Clear all filters"
                },
                autocomplete: {
                    clearSearch: "Clear search history"
                },
                tooltipFiltersIcon: "Applied filters"
            },
            quickSearches: {
                ukrainianOwned: "🇺🇦 owned",
                restaurants: "Dining",
                cafe: "Cafe & Bakery",
                shopping: "Shopping"
            }
        },
        categories: {
            [BusinessCategory.CafeAndBakery]: 'Cafe & Bakery',
            [BusinessCategory.Education]: 'Education',
            [BusinessCategory.FoodAndBeverage]: 'Food & Beverage',
            [BusinessCategory.Dining]: 'Dining',
            [BusinessCategory.ArtsAndEntertainment]: 'Arts & Entertainment',
            [BusinessCategory.CommunityAndReligion]: 'Community & Religion',
            [BusinessCategory.Shopping]: 'Shopping',
            [BusinessCategory.HomeServices]: 'Home Services',
            [BusinessCategory.OtherServices]: 'Other Services',
            [BusinessCategory.HealthAndWellness]: 'Health & Wellness'
        },
        mapView: {
            layers: "Layers",
            satellite: "Satellite",
            streets: "Streets"
        },
        noBusinessesFound:
            'No businesses found... You might need to refine your search query 🤷',
        noBusinessesFoundShort: 'No businesses found...',
        reportPanel: {
            title: 'Report a business',
            success: 'Success!',
            thankYou:
                'Thank you for reporting this business.\nWe will review your request as soon as possible.\nIn the meantime, please do not hesitate to contact us if there is any other information you would like to bring to our attention. 🙂',
            closePanel: 'Click here to close this dialog.',
            caseNumber: 'Your ticket number is ',
            notSure: "Not sure if you should report this business?",
            reportPlaceholder: "Please explain the issue with the business. Be as specific as possible. Make sure to explain how you know that information.",
            reportFieldLabel: "Explain your report (required)",
            contactPlaceholder: "Please provide your contact information (name and phone/email/social media) in case we need to reach out to you regarding this request. This is optional.",
            contactFieldLabel: "Your contact info (optional)",
            readMoreAboutReporting: "Read more about our reporting guidelines here.",
            timedOut: 'Your request timed out :( Try again in a few seconds.',
            tryAgain: 'Try Again',
            error: 'An unknown error occurred :( Try again in a few seconds.'
        },
        feedbackPanel: {
            title: 'Leave feedback',
            success: 'Success!',
            thankYou:
                'Thank you for giving us feedback!.\nWe will do our best to implement it as soon as we can.\nIn the meantime, please do not hesitate to contact us if there is any other information you would like to bring to our attention. 🙂',
            closePanel: 'Click here to close this dialog.',
            caseNumber: 'Your ticket number is ',
            contentPlaceholder: "Please be as detailed as possible in your feedback.",
            contentFieldLabel: "Explain your feedback (required)",
            contactPlaceholder: "Please provide your contact information (name and phone/email/social media) in case we need to reach out to you regarding this request. This is optional.",
            contactFieldLabel: "Your contact info (optional)",
            timedOut: 'Your request timed out :( Try again in a few seconds.',
            tryAgain: 'Try Again',
            error: 'An unknown error occurred :( Try again in a few seconds. If this error persists, please email us at shoplocal4ukraine@gmail.com.',
            categoryFieldLabel: "Feedback category"
        },
        infoEditPanel: {
            title: 'Add/edit information',
            success: 'Success!',
            thankYou:
                'Thank you for suggesting your edit.\nWe will review your request as soon as possible.\nIn the meantime, please do not hesitate to contact us if there is any other information you would like to bring to our attention. 🙂',
            closePanel: 'Click here to close this dialog.',
            caseNumber: 'Your ticket number is ',
            contentPlaceholder: "Please describe what kind of information is incorrect/missing. Provide references to the real information. Be as specific as possible.",
            contentFieldLabel: "What kind of information should we edit? (required)",
            contactPlaceholder: "Please provide your contact information (name and phone/email/social media) in case we need to reach out to you regarding this request. This is optional.",
            contactFieldLabel: "Your contact info (optional)",
            timedOut: 'Your request timed out :( Try again in a few seconds.',
            tryAgain: 'Try Again',
            error: 'An unknown error occurred :( Try again in a few seconds.'
        },
        sharePanel: {
            title: 'Share',
            tooltipCopy: 'Copy link',
            labelIncludeFilters: 'Include search query and filters',
            labelIncludeView: 'Include view settings',
            toastSuccessCopy: 'Copied link',
        },
        tag: {
            [Tag.LeadSupporter]: 'Lead supporter',
            [Tag.OnRequest]: 'On request',
            [Tag.Online]: 'Online-only',
            [Tag.SellUkrainianProducts]: 'Sell Ukrainian products',
            [Tag.UkrainianOwned]: 'Ukrainian-owned'
        },
        tagExtended: {
            [Tag.LeadSupporter]: 'Businesses that made significant contributions to the Ukrainian community: fundraising, event support, donation, and in other ways.',
            [Tag.OnRequest]: 'All services and products are offered in person but not through a physical location.',
            [Tag.Online]: 'All services and products are offered online only and with deliveries if applicable.',
            [Tag.SellUkrainianProducts]: 'Offers Ukrainian services and products made by Ukrainians or imported from Ukraine.',
            [Tag.UkrainianOwned]: 'Ukrainian-owned: Ukrainian immigrants, Ukrainian family, Ukrainian Americans with strong Ukrainian ties.'
        },
        tagShort: {
            [Tag.LeadSupporter]: 'supporter',
            [Tag.OnRequest]: 'on request',
            [Tag.Online]: 'online',
            [Tag.SellUkrainianProducts]: 'Ukrainian product',
            [Tag.UkrainianOwned]: 'owned'
        }
    },
    countries: {
        USA: 'USA',
    },
};

export default strings_en;
