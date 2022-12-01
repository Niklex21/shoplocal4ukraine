import { log } from "next-axiom";
import { ReportModel } from "./types";

const logger = log.with({ "from": "api.reports.model" })

/**
 * Converts a given {@link ReportModel} to Airtable-accepted dictionary data.
 * @param report an instance of {@link ReportModel} to convert 
 */
export function modelToJson(report: ReportModel) : any {
    
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
