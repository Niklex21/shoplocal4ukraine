import { FieldSet, Records, Table } from 'airtable'
import { QueryParams } from 'airtable/lib/query_params'

import base from '../_airtable'
import { processError } from '../_error'
import { jsonToBusiness } from './model'
import { BusinessModel } from './types'

import { log } from 'next-axiom'

const logger = log.with({ from: "api.business" })

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
           .then(records => {
                logger.debug(`Success getting records by formula ${ formula }`)
                return records
            })
           .catch(err => processError(err))
}

/**
 * Gets all records from the `Business` table.
 *
 * @returns all the records in the `Business` table
 */
async function getPublishedRecords() : Promise<Array<BusinessModel>> {
    logger.debug("Attempting to load published records")
    let records = await _getRecordsByFormula("Publish = 1")

    if (records) {
        logger.debug(`Success: ${ records.length } got published records`)
        return records.map((r: any) => jsonToBusiness(r._rawJson))
    }

    logger.debug("No records found, returning empty")

    return []
}

/**
 * Gets a record by its id.
 * @param id the id of the targeted record
 */
async function getRecordById(id: string) : Promise<BusinessModel | null> {

    logger.debug(`Attempting to get record by id: ${ id }`)

    return table.find(id)
           .then(record => {
                if (record) {
                    logger.debug(`Success getting record with id ${ id }: ${ record }`)
                    return jsonToBusiness(record._rawJson)
                }

                logger.debug(`Record with id ${ id } not found, returning null`)

                return null
            })
           .catch(err => {
                processError(err)
                return null
           })
}

export { getPublishedRecords, getRecordById }
