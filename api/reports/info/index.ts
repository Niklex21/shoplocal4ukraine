import _base from '../../_airtable'
import { log } from "next-axiom"
import { modelToJson } from "./model"
import { ReportEditInfoModel } from "./types"
import { Table, FieldSet } from 'airtable'
import { processError } from '@api/_error'

const logger = log.with({ from: "api.reports" })

const table : Table<FieldSet> = _base("tblIkXnNpCQFa1WXC") ?? _base("Missing/incorrect info")

/**
 * Attempts to add an EditInfo report to the database.
 * @param report an instance of {@link ReportEditInfoModel}
 * @returns the report number if added successfully, null otherwise
 */
async function addReport(report: ReportEditInfoModel) : Promise<number | null> {

    logger.debug("Attempting to add an EditInfo report...")

    return table.create([modelToJson(report)])
        .then(records => {
            logger.debug(`Added an EditInfo report with number ${records[0]._rawJson['Number']}`)   

            return records[0].get('Number') as number
        })
        .catch(err => {
            processError(err, "", logger.with({ "function": "addReport" }))
            return null;
        })
}

export { addReport }
