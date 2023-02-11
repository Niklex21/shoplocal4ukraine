import { addReport } from "@api/reports/feedback";
import { FeedbackCategory, ReportFeedbackModel } from "@api/reports/feedback/types";
import { NextApiRequest, NextApiResponse } from "next";
import { AxiomAPIRequest, withAxiom } from "next-axiom/dist/withAxiom";


/**
 * An api handler to add a Feedback report to the system.
 * @param req the request object
 * @param res the response object
 * @returns status report and the added report number if successful
 */
async function handler(req: AxiomAPIRequest, res: NextApiResponse) {
    const body = req.body

    const logger = req.log.with({ "from": "pages.api.report.feedback" })

    try {
        let category : FeedbackCategory = parseInt(body.category)

        const report : ReportFeedbackModel = {
            category: category,
            source: body.source,
            content: body.content,
            contact: body.contact
        }

        let result = await addReport(report)

        if (result) {
            logger.debug(`Successfully added feedback report ${ result }`)
            return res.status(200).send({ reportNumber: result })
        }

        throw Error("Report could not be added, try again")

    } catch (e) {
        logger.error(`Server error while processing report request: ${e}`)
        return res.status(500).end()
    }
}

export default withAxiom(handler)
