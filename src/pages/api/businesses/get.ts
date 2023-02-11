import { jsonToBusiness } from "@api/business/model";
import { BusinessModel } from "@api/business/types";
import Airtable, { FieldSet, Table } from "airtable";
import { QueryParams } from "airtable/lib/query_params";
import { NextApiRequest, NextApiResponse } from "next";
import { AxiomAPIRequest, withAxiom } from "next-axiom/dist/withAxiom";


/**
 * An api handler to get all businesses from the Airtable database.
 * @param req the request object
 * @param res the response object
 * @returns status report and the added report number if successful
 */
async function handler(req: AxiomAPIRequest, res: NextApiResponse) {
    const logger = req.log.with({ "from": "pages.api.businesses.get" })

    logger.debug("Attempting to load business records")

    try {
        let options : QueryParams<FieldSet> = {}

        let formula = "Publish = 1"
        options["filterByFormula"] = formula

        Airtable.configure({
            apiKey: process.env.AIRTABLE_API_KEY
        })

        const base : Airtable.Base = Airtable.base(process.env.AIRTABLE_BASE_ID || "appo268wXvedC1FSM")
        const table : Table<FieldSet> = base("Businesses")

        let businesses : BusinessModel[] = await
            table.select(options)
            .all()
            .then(records => {
                    logger.debug(`Success getting records by formula ${ formula }`)
                    if (records) {
                        logger.debug(`Success: got ${ records.length } published records`)
                        return records.map((r: any) => jsonToBusiness(r._rawJson))
                    }

                    logger.debug("No records found, returning empty")
                    return []
                })
            .catch(err => { throw Error(String(err).toString()) })
            ?? []

        logger.debug(`Loaded ${ businesses.length } businesses`)

        return res.status(200).json({ businesses })
    } catch (e) {
        logger.error(`Server error while processing report request: ${e}`)
        return res.status(500).end()
    }
}

export default withAxiom(handler)
