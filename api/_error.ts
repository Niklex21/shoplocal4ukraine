import { log } from 'next-axiom'

enum ErrorType {
    InvalidBusinessCategory,
    InvalidAffiliationType,
    InvalidCountry,
    InvalidBusinessView
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