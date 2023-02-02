import defaultImage from '@public/images/flag.jpg'

const strings_en = {
    all: {
        title: 'Shop 4 Ukraine',
        genericError: "Sorry, something went wrong.",
        reportError: "Report a problem with the website",
        pages: {
            home: 'Home'
        }
    },
    app: {
        tooltipMenuButton: 'Menu',
        tooltipClearSearch: "Clear search",
        errors: {
            fieldRequired: 'This field is required',
        },
        submit: 'Submit',
    },
    landing: {
        about: {
            teamSectionTitle: 'The Team',
            socials: {
                email: 'Email',
                linkedin: 'LinkedIn',
                facebook: 'Facebook',
                instagram: 'Instagram',
                twitter: 'Twitter',
                behance: 'Behance',
                website: 'Website',
            },
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
            about: 'About Us',
            privacyStatement: 'Privacy Statement',
            join: 'Add Your Business',
        },
        footer: {
            callAction: 'Support Ukraine, add a business',
            callButton: 'Add Your Business',
            descriptionText: 'Discover local businesses that support Ukraine.',
            sections: {
                pages: {
                    name: 'Pages',
                    home: 'Home',
                    businesses: 'Discover Businesses',
                    about: 'About Us',
                    privacyStatement: 'Privacy Statement',
                    join: 'Add Your Business',
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
            searchBarLabel: 'Search map',
            categorySelectLabel: 'Select categories',
            tagSelectLabel: 'Select tags',
            tooltipAddBusiness: 'Add a business',
            show: 'Show',
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
