import { log } from "next-axiom";
import { ReportViolationModel } from "./types";

const logger = log.with({ "from": "api.reports.violation.model" })

/**
 * Converts a given {@link ReportViolationModel} to Airtable-accepted dictionary data.
 * @param report an instance of {@link ReportViolationModel} to convert
 */
export function modelToJson(report: ReportViolationModel) : any {

    let result : any = {
        'Business': report.business,
        'Report': report.report
    }

    if (report.contact) {
        result['Contact'] = report.contact
    }

    return {
        fields: result
    }
}
