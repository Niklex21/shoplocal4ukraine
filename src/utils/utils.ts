import { BusinessModel } from "@api/business/types";

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
    return businesses.find(el => el.id === id) ?? {} as BusinessModel
}