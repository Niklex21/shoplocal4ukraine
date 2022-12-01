import { addReport } from "@api/reports";
import { ReportModel } from "@api/reports/types";
import { NextApiRequest, NextApiResponse } from "next";
import { log } from "next-axiom";

const logger = log.with({ "from": "pages.api.report" })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body

    const report : ReportModel = {
        business: [body.businessId],
        report: body.report,
        contact: body.contact
    }

    try {
        let result = await addReport(report)

        if (result) {
            logger.debug("Successfully added report ", result)
            return res.status(200).json({ reportNumber: result })
        }

        throw Error("Report could not be added, try again")
        
    } catch (e) {
        logger.error("Server error while processing report request: ", e)
        return res.status(500).end()
    }
}
