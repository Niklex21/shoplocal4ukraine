import { Model } from "@api/types"

/**
 * All the currently supported business categories.
 */
export enum BusinessCategory {
    CafeAndBakery,
    Education,
    FoodAndBeverage,
    Dining,
    ArtsAndEntertainment,
    CommunityAndReligion,
    Shopping,
    HomeServices,
    OtherServices,
    HealthAndWellness
}

/**
 * All the currently supported tags.
 */
export enum Tag {
    UkrainianOwned,
    Online,
    OnRequest,
    SellUkrainianProducts,
    LeadSupporter,
    HiresUkrainians
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
 */
export type BusinessModel = Model & {
    id: string,
    name: string,
    description: string,
    contributions: string,
    businessCategory: BusinessCategory,
    tags: Array<Tag>,
    location: Location,
    website?: string,
    images?: Array<string>,
    email?: string,
    phone?: string,
    socialMedia?: string
}
