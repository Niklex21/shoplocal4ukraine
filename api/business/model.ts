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
    name: string,
    description: string,
    businessCategory: BusinessCategory,
    affiliation: AffiliationType,
    location: Location,
    website?: string,
    images?: Array<string>,
    email?: string,
    phone?: string,
    socialMedia?: string
}

interface IndexableBusinessModel {
    [key: string]: keyof BusinessModel
}

/**
 * Denotes the type of the const object to map BusinessModel properties to the json key and a converting function.
 * 
 * - key: the key of a property in {@link BusinessModel}
 * - json: the string key of a property in the Airtable API query
 * - converter (optional): a function that converts the Airtable API query value into a necessary type value for BusinesModel
 */
type MapBusinessJSON = {
    key: keyof BusinessModel,
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
            processError(ErrorType.InvalidBusinessCategory, `Current value: ${ value }`);
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
            processError(ErrorType.InvalidAffiliationType, `Current value: ${ value }`);
            return null;
    }
    
    return affiliation;
}

/**
 * Processes raw JSON data from Airtable and returns a {@link BusinessModel} object.
 * 
 * @param obj the raw JSON data from the Airtable
 * @returns the data as a {@link BusinessModel} object
 */
export function jsonToBusiness(obj: any) : BusinessModel {
    let business : BusinessModel = {} as BusinessModel;

    const jsonToBusinessMap : Array<MapBusinessJSON> = [
        {
            key: business.name as keyof BusinessModel,
            json: 'Name'
        },
        {
            key: business.description as keyof BusinessModel,
            json: 'Description'
        },
        {
            key: business.businessCategory as unknown as keyof BusinessModel,
            json: 'Business category',
            converter: businessCategoryConverter
        },
        {
            key: business.affiliation as unknown as keyof BusinessModel,
            json: 'Affiliation Type',
            converter: affiliationTypeConverter
        },
    ]

    jsonToBusinessMap.forEach(({ key, json, converter }) => {
        if (json in obj) {
            business[key] = ((converter && converter(obj[json])) ? converter(obj[json]) : obj[json]) as keyof BusinessModel;
        }
    })

    return business;
}