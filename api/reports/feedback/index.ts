import _base from '../../_airtable'
import { log } from "next-axiom"
import { modelToJson } from "./model"
import { ReportFeedbackModel } from "./types"
import { Table, FieldSet } from 'airtable'
import { processError } from '@api/_error'

const logger = log.with({ from: "api.reports.feedback.index" })

const table : Table<FieldSet> = _base("tblauOAVvxwIDo8vF") ?? _base("Feedback")

/**
 * Attempts to add a feedback report to the database.
 * @param report an instance of {@link ReportFeedbackModel}
 * @returns the report number if added successfully, null otherwise
 */
async function addReport(report: ReportFeedbackModel) : Promise<number | null> {

    logger.debug("Attempting to add a Feedback report...")

    return table.create([modelToJson(report)])
        .then(records => {
            logger.debug(`Added an Feedback report with number ${records[0]._rawJson['Number']}`)   

            return records[0].get('Number') as number
        })
        .catch(err => {
            processError(err, "", logger.with({ "function": "addReport" }))
            return null;
        })
}

export { addReport }
