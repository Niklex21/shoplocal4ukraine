import { log, Logger } from 'next-axiom'

enum ErrorType {
    InvalidBusinessCategory = "Invalid Business Category",
    InvalidCountry = "Invalid Country",
    InvalidBusinessView = "Invalid Business View",
    InvalidTag = "Invalid Tag",
    InvalidFeedbackCategory = "Invalid Feedback Category"
}

/**
 * Handles the supplied API errors.
 *
 * @param err an error that occurred while retrieving data through some API requests
 */
function processError(err: ErrorType | any, msg: string = "", logger: Logger = log) {
    logger.error(`Error: ${ err } | ${ msg }`)
}

export { ErrorType, processError }
