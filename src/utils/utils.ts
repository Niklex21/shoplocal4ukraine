/**
 * Shortens a given URL by removing the scheme and the www subdomains.
 * 
 * @param url the url to shorten
 * @returns the shortened URL
 */
export function urlShortener(url: string): string {
    return url.replaceAll('https://', '').replaceAll('http://', '').replaceAll('www.', '').replace('/\/+$/', '');
}