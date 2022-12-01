import _base from '../_airtable'
import { log } from "next-axiom"
import { modelToJson } from "./model"
import { ReportModel } from "./types"
import { Table, FieldSet } from 'airtable'
import { processError } from '@api/_error'

const logger = log.with({ from: "api.reports" })

const table : Table<FieldSet> = _base("Reports")

/**
 * Attempts to add a report to the database.
 * @param report an instance of {@link ReportModel}
 * @returns the report number if added successfully, null otherwise
 */
async function addReport(report: ReportModel) : Promise<number | null> {

    logger.debug("Attempting to add a report...")

    return table.create([modelToJson(report)])
        .then(records => {
            logger.debug("Added a report with number ", records[0]._rawJson['Number'])   

            return records[0].get('Number') as number
        })
        .catch(err => {
            processError(err, "", logger.with({ "function": "addReport" }))
            return null;
        })
}

export { addReport }
