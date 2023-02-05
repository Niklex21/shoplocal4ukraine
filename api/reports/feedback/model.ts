import { feedbackCategoryConverter } from "@utils/converters";
import { log } from "next-axiom";
import { ReportFeedbackModel } from "./types";

const logger = log.with({ "from": "api.reports.feedback.model" })

/**
 * Converts a given {@link ReportFeedbackModel } to Airtable-accepted dictionary data.
 * @param report an instance of {@link ReportFeedbackModel} to convert 
 */
export function modelToJson(report: ReportFeedbackModel) : any {
    
    let result : any = {
        'Category': feedbackCategoryConverter(report.category),
        'Source': report.source,
        'Content': report.content
    }
    
    if (report.contact) {
        result['Contact'] = report.contact
    }

    return {
        fields: result
    }
}
