import defaultImage from '@public/images/flag.jpg'

const strings_en = {
    all: {
        title: 'Shop 4 Ukraine',
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
        }
    },
    landing: {
        about: {
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
            whoWeAre: {
                title: "Who we are",
                mission: {
                    m1: "We are a Boston-based",
                    h1: "nonprofit",
                    m2: "with a mission to",
                    h2: "bring attention",
                    m3: "to",
                    h3: "Ukraine-supporting businesses",
                    m4: "in your area."
                }
            },
            whyWeDoIt: {
                title: "Why we do it",
                content: "All of our team members are Ukrainian, and with the ongoing war, we feel it is crucial to support our people through all possible avenues. With this project, we found a new way to do so — by bringing attention to Ukrainian-owned or Ukraine-supporting local businesses."
            },
            howThisWorks: {
                title: "How this works",
                customer: {
                    title: "Customer",
                    text: "Through our app, you have access to a map highlighting businesses around you that support Ukraine. Whether you are looking for a hotel, a coffee shop, or a gym — we've got you covered!"
                },
                business: {
                    title: "Business",
                    text: "If you are a business that supports Ukraine, we will add your information to our list, exposing and promoting your business to hundreds of active users. No additional actions required from you."
                }
            },
            faq: {
                title: "FAQ",
                toggles: [
                    {
                        question: 'How do you define "business that supports Ukraine"?',
                        answer: `We leave it at our own discretion to determine whether or not a business supports Ukraine. Each evaluation is performed by one of our team members, and all decisions are made on a case-by-case basis. All businesses that we display contain a short descriptions of their contributions that let them qualify as "Ukraine supporters".`,
                        linkText: "Read more about our guidelines here.",
                        link: "#"
                    },
                    {
                        question: "How do you verify businesses?",
                        answer: ""
                    },
                    {
                        question: "How do you select featured businesses?",
                        answer: ""
                    },
                    {
                        question: "What if I know a businesses that I think should be on the website?",
                        answer: ""
                    },
                    {
                        question: "I have other questions. How do I get in contact with you?",
                        answer: ""
                    }
                ]
            },
            roadmap: {
                title: "Roadmap"
            },
            wantToWorkWithUs: {
                title: "Let's get in touch!",
                text1: "Check out our open positions",
                openPositionsLinkText: "here",
                text2: ". If you don't find anything that fits you, shoot us an email at",
                text3: "with your resume and explain in a few sentences how you would like to help us. We'd love to talk to you and we always need the help!",
                text4: "If you are looking to collaborate with us, send us an email explaining how we can help each other — we'd love to find some common ground with you!"
            }
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
                    description: "Our platform is a non-profit, thus we do not charge any money to use it. No ads, no fees, no subscription."
                },
                verified: {
                    title: "Verified",
                    description: "All businesses on our list undergo a rigorous verification process, so you can be sure that your money goes to the right place."
                },
                support: {
                    title: "Support Ukraine",
                    description: "By shopping with Ukrainian-supporting or Ukrainian-owned businesses, your money helps others."
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
                        image: defaultImage,
                        name: "Business",
                        category: "Restaurant",
                        description: "Really cool business did a lot of stuff for Ukraine of course must be rewarded hehe",
                        link: '/businesses?id=""'
                    },
                    {
                        image: defaultImage,
                        name: "Business",
                        category: "Restaurant",
                        description: "Really cool business did a lot of stuff for Ukraine of course must be rewarded hehe",
                        link: '/businesses?id=""'
                    },
                    {
                        image: defaultImage,
                        name: "Business",
                        category: "Restaurant",
                        description: "Really cool business did a lot of stuff for Ukraine of course must be rewarded hehe",
                        link: '/businesses?id=""'
                    },
                    {
                        image: defaultImage,
                        name: "Business",
                        category: "Restaurant",
                        description: "Really cool business did a lot of stuff for Ukraine of course must be rewarded hehe",
                        link: '/businesses?id=""'
                    },
                    {
                        image: defaultImage,
                        name: "Business",
                        category: "Restaurant",
                        description: "Really cool business did a lot of stuff for Ukraine of course must be rewarded hehe",
                        link: '/businesses?id=""'
                    }
                ]
            }
        },
        navbar: {
            businesses: 'Discover Businesses',
            howToSupportUkraine: "How To Support Ukraine",
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
                    howToSupportUkraine: "How to Support Ukraine"
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
                placeholder: "Search businesses"
            }
        },
        categories: {
            crafts: 'Crafts',
            restaurant: 'Restaurant',
            cafe: 'Cafe',
            services: 'Services',
            lifestyle: 'Lifestyle',
            groceries: 'Groceries',
            shopping: 'Shopping',
            product: 'Product'
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
            ukrainianOwned: 'Ukrainian-owned',
            onlineOnly: "Online-only"
        },
    },
    countries: {
        USA: 'USA',
    },
};

export default strings_en;
