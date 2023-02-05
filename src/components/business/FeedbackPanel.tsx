import { FullScreenPanelPosition, PanelState, SubmitStatus } from "@appTypes/businesses";
import FullScreenPanel from "@components/common/FullScreenPanel";
import strings from "@utils/strings";
import { twMerge } from "tailwind-merge";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ReactNode, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import defaults from "@utils/config";
import { log } from "next-axiom";
import { FeedbackCategory } from "@api/reports/feedback/types";
import { feedbackCategoryConverter } from "@utils/converters";

type Props = {
    className?: string,
    panelState: PanelState,
    closePanel: () => void,
}

const logger = log.with({ "from": "components.business.FeedbackPanel" })

export default function FeedbackPanel({ className, panelState, closePanel }: Props) {
    
    // tracks whether or not the report is being submitted
    const [ submitStatus, setSubmitStatus ] = useState<SubmitStatus>(SubmitStatus.NotSubmitted)
    // stores the caseNumber assigned to this report
    const [ caseNumber, setCaseNumber ] = useState<number>(-1)

    /**
     * Handles panel closure by having a middleware that also resets the submission state.
     */
    const handleClose = () => {
        setSubmitStatus(SubmitStatus.NotSubmitted)
        closePanel()
    }

    const handleSubmit = async (values: any, { resetForm }: any) => {
        setSubmitStatus(SubmitStatus.InProgress)

        const controller = new AbortController()
        const signal = controller.signal

        const data = JSON.stringify({
            contact: values.contact,
            category: values.category,
            source: window.location.href,
            content: values.content,
        })

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            signal: signal,
            body: data
        }

        try {
            setTimeout(async () => {
                if (submitStatus === SubmitStatus.InProgress) {
                    logger.error(`Feedback request timed out after ${ defaults.requestTimeout } ms`)
                    controller.abort()
                    setSubmitStatus(SubmitStatus.TimeOut)
                }
            }, defaults.requestTimeout)

            const response = await fetch('/api/report/feedback', options)
            const result = (await response.json()).reportNumber

            if (result) {
                setSubmitStatus(SubmitStatus.Success)
                setCaseNumber(result)
                resetForm()
            } else {
                setSubmitStatus(SubmitStatus.Error)
            }
        } catch (e) {
            logger.error(`Error while processing request ${e}`)
            setSubmitStatus(SubmitStatus.Error)
        }
    }

    const SubmitButton = ({ children }: { children: ReactNode }) => (
        <Button type="submit" className="mx-auto bg-ukraine-blue text-white font-bold" variant="contained">
            { children }
        </Button>
    )

    /**
     * Returns a type of button/loader component based on the current status.
     */
    function getButton() {
        if (submitStatus === SubmitStatus.NotSubmitted) {
            return (
                <SubmitButton>
                    { strings.app.submit }
                </SubmitButton>
            )
        }

        if (submitStatus === SubmitStatus.InProgress) {
            return (
                <CircularProgress className="text-ukraine-blue mx-auto" />
            )
        }

        if (submitStatus === SubmitStatus.Success) {
            return (
                <div className="flex flex-col gap-2 prose">
                    <div className="flex w-full flex-col">
                        <div className="text-green-700">
                            { strings.businesses.feedbackPanel.success }
                            &nbsp;
                            { strings.businesses.feedbackPanel.caseNumber }
                            <span className="font-bold">{ caseNumber }</span>
                            .
                        </div>
                    </div>
                    <div className="prose flex flex-col gap-2">
                        <text className="whitespace-pre-line">
                            { strings.businesses.feedbackPanel.thankYou }
                        </text>
                        <text className="cursor-pointer hover:underline italic opacity-80" onClick={ handleClose }>
                            { strings.businesses.feedbackPanel.closePanel }
                        </text>
                    </div>
                </div>
            )
        }

        if (submitStatus === SubmitStatus.TimeOut) {
            return (
                <>
                    <text className="text-red-500 font-bold">{ strings.businesses.feedbackPanel.timedOut }</text>
                    <SubmitButton>
                        { strings.businesses.feedbackPanel.tryAgain }
                    </SubmitButton>
                </>
            )
        }

        if (submitStatus === SubmitStatus.Error) {
            return (
                <>
                    <text className="text-red-500 font-bold">{ strings.businesses.feedbackPanel.error }</text>
                    <SubmitButton>
                        { strings.businesses.feedbackPanel.tryAgain }
                    </SubmitButton>
                </>
            )
        }
    }
    
    return (
        <FullScreenPanel
            className={ twMerge("max-w-md", className) }
            panelState={ panelState }
            closePanel={ handleClose }
            position={ FullScreenPanelPosition.Center }
            title={ strings.businesses.feedbackPanel.title }
        >
            <Formik
                initialValues={{ category: FeedbackCategory.Bug, contact: "", content: "" }}
                validate={
                    values => {
                        const errors : any = {}

                        if (!values.content) {
                            errors.content = strings.app.errors.fieldRequired
                        }

                        return errors
                    }
                }
                onSubmit={ handleSubmit }
            >
                {
                    () => (
                        <Form>
                            <div className="flex flex-col gap-4 justify-center">
                                {
                                    submitStatus === SubmitStatus.Success ?
                                    (<></>) : 
                                    (
                                        <>
                                            <div className="flex flex-col gap-1">
                                                <text>{ strings.businesses.feedbackPanel.categoryFieldLabel }</text>
                                                <Field
                                                    as="select"
                                                    name="category"
                                                    className="cursor-pointer bg-transparent ring-1 ring-slate-600 focus:outline-ukraine-blue rounded-md px-4 py-2"
                                                >
                                                    <option value={ FeedbackCategory.Bug }>{ feedbackCategoryConverter(FeedbackCategory.Bug) }</option>
                                                    <option value={ FeedbackCategory.Suggestion }>{ feedbackCategoryConverter(FeedbackCategory.Suggestion) }</option>
                                                </Field>
                                            </div>
                                            {/* hacky solution to have panel minimum width while still remaining flexibility, don't remove and don't put anything in */}
                                            <div className="flex w-96 shrink"></div>
                                            <div className="flex flex-col gap-1">
                                                <text>{ strings.businesses.feedbackPanel.contentFieldLabel }</text>
                                                <Field
                                                    type="text"
                                                    as="textarea"
                                                    name="content"
                                                    className="bg-transparent ring-1 ring-slate-600 focus:outline-ukraine-blue rounded-md p-4 h-32"
                                                    placeholder={ strings.businesses.feedbackPanel.contentPlaceholder }
                                                />
                                                <ErrorMessage name="report" component="div" className="italic opacity-80 text-sm text-red-700" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <text>{ strings.businesses.feedbackPanel.contactFieldLabel }</text>
                                                <Field
                                                    type="text"
                                                    as="textarea"
                                                    name="contact"
                                                    className="bg-transparent ring-1 ring-slate-600 focus:outline-ukraine-blue rounded-md p-4 h-32"
                                                    placeholder={ strings.businesses.feedbackPanel.contactPlaceholder }
                                                />
                                                <ErrorMessage name="contact" component="div" />
                                            </div>
                                        </>
                                    )
                                }
                                { getButton() }
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </FullScreenPanel>
    )
}
