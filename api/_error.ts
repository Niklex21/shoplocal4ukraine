import { log } from 'next-axiom'

enum ErrorType {
    InvalidBusinessCategory = "Invalid Business Category",
    InvalidCountry = "Invalid Country",
    InvalidBusinessView = "Invalid Business View",
    InvalidTag = "Invalid Tag"
}

/**
 * Handles the supplied API errors.
 *
 * @param err an error that occurred while retrieving data through some API requests
 */
function processError(err: ErrorType | Error, msg: string = "") {
    log.error(`Error: ${ err } | ${ msg }`)
}

export { ErrorType, processError }
