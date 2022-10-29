
/**
 * All the currently supported business categories.
 */
 export enum BusinessCategory {
    Crafts,
    Restaurant,
    Retail,
    Services,
    Lifestyle,
    Groceries,
    Shopping
}

/**
 * All the currently supported tags.
 */
export enum Tag {
    UkrainianOwned
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
    address: string,
    city: string,
    country: Country,
    longitude: number,
    latitude: number
}

/**
 * Main business model type.
 *
 * Fields that are not self-explanatory:
 */
export type BusinessModel = {
    id: string,
    name: string,
    description: string,
    businessCategory: BusinessCategory,
    tags: Array<Tag>,
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
