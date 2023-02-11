import { BusinessModel } from "@api/business/types";
import { SearchedSerializedBusiness, SerializedBusinessModel } from "@appTypes/businesses";
import { Feature } from "geojson";
import defaults from "./config";
import { businessCategoryConverter, tagConverter } from "./converters";

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
    if (obj.constructor === Object && obj && Object.keys(obj).length > 0) {
        return false
    }

    return true
}

/**
 * Converts a given instance of {@link SerializedBusinessModel} to an instance of {@link SearchedSerializedBusiness}.
 * @param b an instance of a {@link SerializedBusinessModel}
 * @returns an instance of {@link SearchedSerializedBusiness}
 */
export function serializedToSearchSerialized(b: SerializedBusinessModel) : SearchedSerializedBusiness {
    // refIndex is required, value is irrelevant because it just represents an unfiltered array of businesses
    return {
        refIndex: 0,
        item: b
    }
}

/**
 * Serializes all enum/object fields according to the current language settings.
 * @param b an instance of {@link BusinessModel} to serialize
 * @returns an instance of {@link SerializedBusinessModel}
 */
export function serializeBusinessModel(b : BusinessModel) : SerializedBusinessModel {
    if (isEmpty(b)) {
        return {} as SerializedBusinessModel
    }

    return {
        ...b,
        serializedBusinessCategory: businessCategoryConverter(b.businessCategory),
        serializedTags: b.tags?.map(t => tagConverter(t)) ?? []
    }
}

/**
 * Returns the source of the profile image for a business.
 * @param b the business
 * @returns the first image in the list or a default image if the image is not available
 */
export function getBusinessProfileImageSrc(b: BusinessModel) : string {
    return b.images && b.images.length > 0 ? b.images[0] : defaults.businesses.gallery.defaultImage.src
}
