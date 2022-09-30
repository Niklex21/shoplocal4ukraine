import {processError, ErrorType } from "@api/_error"

enum BusinessCategory {
    Crafts,
    Dining,
    Retail,
    Services,
    LifeStyle
}

enum AffiliationType {
    UkrainianOwned,
    UkraineSupporters
}

enum Country {
    USA
}

type Location = {
    googleMapsURL: string,
    city: string,
    country: Country,
    longitude: number,
    latitude: number
}

export type BusinessModel = {
    id: string,
    name: string,
    description: string,
    businessCategory: BusinessCategory,
    affiliation: AffiliationType,
    location: Location,
    website?: string,
    images?: Array<string>,
    email?: string,
    phone?: string,
    socialMedia?: string,
    [key: string]: any
}

/**
 * Denotes the type of the const fieldsect to map BusinessModel properties to the json key and a converting function.
 * 
 * - key: the key of a property in {@link BusinessModel}
 * - json: the string key of a property in the Airtable API query
 * - converter (optional): a function that converts the Airtable API query value into a necessary type value for BusinesModel
 */
type MapBusinessJSON = {
    key: string,
    json: string,
    converter?: (value: any) => any
}

/**
 * Converts a given string Business Category value into one of the {@link BusinessCategory} options.
 * @param value an Airtable Business Category
 * @returns null if the value is invalid, one of the {@link BusinessCategory} options otherwise
 */
function businessCategoryConverter(value: string) : BusinessCategory | null {
    let category : BusinessCategory;

    switch (value) {
        case 'Dining':
            category = BusinessCategory.Dining;
            break;
        case 'Life Style':
            category = BusinessCategory.LifeStyle;
            break;
        case 'Retail':
            category = BusinessCategory.Retail;
            break;
        case 'Crafts':
            category = BusinessCategory.Crafts;
            break;
        case 'Services':
            category = BusinessCategory.Services;
            break;
        default:
            processError(ErrorType.InvalidBusinessCategory, `Category provided: ${ value }`);
            return null;
    }

    return category;
}

/**
 * Converts a given string Affiliation Type value into one of the {@link AffiliationType} options.
 * @param value an Airtable Affiliation Type
 * @returns null if the value is invalid, one of the {@link AffiliationType} options otherwise
 */
function affiliationTypeConverter(value: string) : AffiliationType | null {
    let affiliation : AffiliationType;

    switch(value) {
        case 'Ukrainian Owned':
            affiliation = AffiliationType.UkrainianOwned;
            break;
        case 'Ukraine Supporters':
            affiliation = AffiliationType.UkraineSupporters;
            break;
        default:
            processError(ErrorType.InvalidAffiliationType, `Affiliation provided: ${ value }`);
            return null;
    }
    
    return affiliation;
}

function countryConverter(country: string) : Country | null {
    switch (country) {
        case 'USA':
            return Country.USA;
        default:
            processError(ErrorType.InvalidCountry, `Country provided: ${ country }`);
            return null;
    }
}

/**
 * Converts location string attributes to {@link Location}.
 * 
 * @param googleMapsURL comes from ['Address'] Airtable field
 * @param city comes from ['City/town'] field
 * @param country comes from ['Country'] field
 * @param longitude comes from ['Longitude'] field
 * @param latitude comes from ['Latitude'] field
 * @returns a location fieldsect
 */
function locationConverter({googleMapsURL, city, country, longitude, latitude}: any) : Location {
    let location : Location = {} as Location;

    if (googleMapsURL) {
        location.googleMapsURL = googleMapsURL;
    }

    if (city) {
        location.city = city;
    }

    if (country && countryConverter(country)) {
        location.country = countryConverter(country) as Country;
    }

    if (longitude) {
        location.longitude = parseFloat(longitude); 
    }

    if (latitude) {
        location.latitude = parseFloat(latitude);
    }

    return location;
}

/**
 * Processes raw JSON data from Airtable and returns a {@link BusinessModel} object.
 * 
 * @param data the raw JSON data from the Airtable
 * @returns the data as a {@link BusinessModel} object
 */
export function jsonToBusiness(data: any) : BusinessModel {
    let business : BusinessModel = {} as BusinessModel;

    business.id = data['id']

    const fields = data['fields'];

    const jsonToBusinessMap : Array<MapBusinessJSON> = [
        {
            key: 'name',
            json: 'Name'
        },
        {
            key: 'description',
            json: 'Description'
        },
        {
            key: 'businessCategory',
            json: 'Business category',
            converter: businessCategoryConverter
        },
        {
            key: 'affiliation',
            json: 'Affiliation Type',
            converter: affiliationTypeConverter
        },
        {
            key: 'website',
            json: 'Website (Optional)'
        },
        {
            key: 'email',
            json: 'Email (optional)'
        },
        {
            key: 'phone',
            json: 'Phone number (optional)'
        },
        {
            key: 'socialMedia',
            json: 'Primary social media / Linktree (optional)'
        }
    ]

    jsonToBusinessMap.forEach(({ key, json, converter }) => {
        if (json in fields) {
            business[key] = (converter && converter(fields[json])) ? converter(fields[json]) : fields[json];
        }
    })

    business.location = locationConverter({
        googleMapsURL: fields['Address'],
        city: fields['City/town'],
        country: fields['Country'],
        latitude: fields['Latitude'],
        longitude: fields['Longitude']
    });

    return business;
}