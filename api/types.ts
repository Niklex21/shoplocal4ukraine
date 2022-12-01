/**
 * Denotes the type of the const fieldset to map Model properties to the json key and a converting function.
 *
 * - key: the key of a property in a Model
 * - json: the string key of a property in the Airtable API query
 * - converter (optional): a function that converts the Airtable API query value into a necessary type value for BusinesModel
 */
export type JsonModelConverter = {
    key: string,
    json: string,
    converter?: (value: any) => any
}

/**
 * A generic Model type to be inherited by specific models
 * [key: string]: any is a syntax that allows this object to be 
 * referenced as dictionaries -- by string fields. This is done so
 * that we can write automatic converters for Airtable fields. This should
 * be used very sparingly.
 */
export type Model = {
    [key: string]: any
}