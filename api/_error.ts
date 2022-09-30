enum ErrorType {
    InvalidBusinessCategory,
    InvalidAffiliationType,
    InvalidCountry
}

/**
 * Handles the supplied API errors.
 * 
 * @param err an error that occurred while retrieving data through some API requests
 */
function processError(err: ErrorType, msg: string) {
    // TODO: add logger
    console.log(err, msg);
}

export { ErrorType, processError }