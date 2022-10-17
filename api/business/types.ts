
/**
 * All the currently supported business categories.
 */
 export enum BusinessCategory {
    Crafts,
    Dining,
    Retail,
    Services,
    LifeStyle
}

/**
 * All the currently supported affiliation types.
 */
export enum AffiliationType {
    UkrainianOwned,
    UkraineSupporters
}

/**
 * All the currently supported countries
 */
export enum Country {
    USA
}

/**
 * A location type to store the location of a business.
 */
export type Location = {
    googleMapsURL: string,
    city: string,
    country: Country,
    longitude: number,
    latitude: number
}

/**
 * Main business model type.
 *
 * Fields that are not self-explanatory:
 * - affiliation: either owned by Ukrainians, or support Ukraine in other ways
 */
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
export type MapBusinessJSON = {
    key: string,
    json: string,
    converter?: (value: any) => any
}
