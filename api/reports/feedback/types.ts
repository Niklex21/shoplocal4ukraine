import { Model } from "@api/types";

export enum FeedbackCategory {
    Bug,
    Suggestion
}

/**
 * Schema describing a report of feedback for the website.
 *
 * - id generated automatically
 * - number is an autoincrement
 * - category is either a bug or a suggestion
 * - source is a field describing where the feedback is coming from,
 *   like the website page, open business
 * - content is a long text explaining the problem
 * - contact is an optional long text field where they can
 *   outline how to contact them in case we have more questions
 */
export type ReportFeedbackModel = Model & {
    id?: string,
    number?: number
    category: FeedbackCategory,
    source: string,
    content: string,
    contact?: string,
}
