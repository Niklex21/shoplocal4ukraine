import { log } from "next-axiom";
import { ReportEditInfoModel } from "./types";

const logger = log.with({ "from": "api.reports.model" })

/**
 * Converts a given {@link ReportEditInfoModel } to Airtable-accepted dictionary data.
 * @param report an instance of {@link ReportEditInfoModel} to convert 
 */
export function modelToJson(report: ReportEditInfoModel) : any {
    
    let result : any = {
        'Business': report.business,
        'Content': report.content
    }
    
    if (report.contact) {
        result['Contact'] = report.contact
    }

    return {
        fields: result
    }
}
