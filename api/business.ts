import { FieldSet, Table } from 'airtable'
import { QueryParams } from 'airtable/lib/query_params'

import base from './_airtable'
import processError from './_error'

const table : Table<FieldSet> = base('Business')

/**
 * A private util function to get all records from the business table with a specific formula.
 * 
 * @param formula An Airtable-valid formula ({@link https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference})
 * @return the records that correspond to the supplied formula
 */
async function _getRecordsByFormula(formula: string = "", fields: Array<string> = []) {

    let options : QueryParams<FieldSet> = {}

    if (formula !== "") {
        options["filterByFormula"] = formula 
    }

    if (fields.length > 0) {
        options["fields"] = fields
    }
    
    return table.select(options)
           .all()
           .then(records => { return records })
           .catch(err => processError(err))
}

/**
 * Gets all records from the `Business` table.
 * 
 * @returns all the records in the `Business` table
 */
async function getPublishedRecords() {
    return await _getRecordsByFormula("Publish = 1")
}

/**
 * Gets a record by its id.
 * @param id 
 */
async function getRecordById(id: string) {
    table.find(id)
    .then( record => { return record })
    .catch(err => processError(err))
}

export { getPublishedRecords, getRecordById }