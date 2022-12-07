import { Model } from "@api/types";

/**
 * Schema describing a report of a guideline violation by a business.
 * - id generated automatically
 * - number is an autoincrement
 * - business is an array (max one) of references to 
 *   the business that the report is filed one
 * - report is a long text explaining the problem
 * - contact is an optional long text field where they can
 *   outline how to contact them in case we have more questions
 */
export type ReportViolationModel = Model & {
    id?: string,
    number?: number,
    business: Array<string>,
    report: string,
    contact?: string,
}