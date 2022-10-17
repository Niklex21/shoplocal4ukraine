import { FieldSet, Records, Table } from 'airtable'
import { QueryParams } from 'airtable/lib/query_params'

import base from '../_airtable'
import { processError } from '../_error'
import { BusinessModel, jsonToBusiness } from './model'

const table : Table<FieldSet> = base('Business')

/**
 * A private util function to get all records from the business table with a specific formula.
 *
 * @param formula An Airtable-valid formula ({@link https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference})
 * @return the records that correspond to the supplied formula
 */
async function _getRecordsByFormula(formula: string = "", fields: Array<string> = []) : Promise<void | Records<FieldSet>>{

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
async function getPublishedRecords() : Promise<Array<BusinessModel>> {
    let records = await _getRecordsByFormula("Publish = 1")

    if (records) {
        return records.map((r: any) => jsonToBusiness(r._rawJson))
    }

    return []
}

/**
 * Gets a record by its id.
 * @param id
 */
async function getRecordById(id: string) : Promise<BusinessModel | null> {
    return table.find(id)
           .then(record => {
                if (record) {
                    return jsonToBusiness(record._rawJson)
                }

                return null
            })
           .catch(err => {
                processError(err)
                return null
           })
}

export { getPublishedRecords, getRecordById }
