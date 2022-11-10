import { BusinessModel } from "@api/business/types";
import { FilteredBusiness } from "@appTypes/businesses";
import { Feature, FeatureCollection } from "geojson";

/**
 * Shortens a given URL by removing the scheme and the www subdomains.
 *
 * @param url the url to shorten
 * @returns the shortened URL
 */
export function urlShortener(url: string): string {
    return url.replaceAll('https://', '').replaceAll('http://', '').replaceAll('www.', '').replace(/\/+$/, '');
}

/**
 * Finds and returns the business with the given id from the given list of businesses.
 * @param businesses the list of businesses
 * @param id the id of the business (string)
 * @returns the business if found or an empty BusinessModel object
 */
export function findBusinessById(businesses: Array<BusinessModel>, id: string) : BusinessModel {
    return businesses.find((el : BusinessModel) => el.id === id) ?? {} as BusinessModel
}

/**
 * Convert a given instance of {@link BusinessModel} to a geojson {@link Feature}.
 * @param business a given business to convert
 * @returns a geojson feature formatted to contain the given business
 */
export function modelToGeojsonFeature(business: BusinessModel) : Feature {
    return {
        id: business.id,
        type: 'Feature',
        geometry: {
            type: "Point",
            coordinates: [ business.location.longitude, business.location.latitude ]
        },
        properties: business
    }
}

/**
 * Checks if the supplied dictionary (Object) is empty.
 * @param obj a generic dictionary
 * @returns true if the dictionary is empty (no keys), false otherwise
 */
export function isEmpty(obj: Object) : boolean { 
    return Object.keys(obj).length === 0
}

/**
 * Converts a given instance of {@link BusinessModel} to an instance of {@link FilteredBusiness}.
 * @param b an instance of a BusinessModel
 * @returns an instance of FilteredBusiness
 */
export function businessToFilteredBusiness(b: BusinessModel) : FilteredBusiness {
    // refIndex is required, value is irrelevant because it just represents an unfiltered array of businesses
    return {
        refIndex: 0,
        item: b
    }
}
