import { FullScreenPanelPosition, PanelState, SubmitStatus } from "@appTypes/businesses";
import FullScreenPanel from "@components/common/FullScreenPanel";
import strings from "@utils/strings";
import { useAtom } from "jotai";
import { atomCurrentBusiness } from "src/atoms/businesses";
import { twMerge } from "tailwind-merge";
import Image from "next/image"
import Link from "next/link"
import { getBusinessProfileImageSrc } from "@utils/utils";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ReactNode, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import defaults from "@utils/config";
import { log } from "next-axiom";

type Props = {
    className?: string,
    panelState: PanelState,
    closePanel: () => void,
}

const logger = log.with({ "from": "components.business.InfoEditPanel" })

export default function InfoEditPanel({ className, panelState, closePanel }: Props) {
    
    const [ currentBusiness ] = useAtom(atomCurrentBusiness)
    // tracks whether or not the report is being submitted
    const [ submitStatus, setSubmitStatus ] = useState<SubmitStatus>(SubmitStatus.NotSubmitted)
    // stores the caseNumber assigned to this report
    const [ caseNumber, setCaseNumber ] = useState<number>(-1)

    const imageSrc = getBusinessProfileImageSrc(currentBusiness)

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
            businessId: currentBusiness.id,
            content: values.content,
            contact: values.contact
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
                    logger.error(`Report request timed out after ${ defaults.requestTimeout } ms`)
                    controller.abort()
                    setSubmitStatus(SubmitStatus.TimeOut)
                }
            }, defaults.requestTimeout)

            const response = await fetch('/api/report/infoEdit', options)
            const result = (await response.json()).reportNumber

            if (result) {
                setSubmitStatus(SubmitStatus.Success)
                setCaseNumber(result)
                resetForm()
            } else {
                setSubmitStatus(SubmitStatus.Error)
            }
        } catch (e) {
            logger.error("Error while processing request", e)
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
                            { strings.businesses.infoEditPanel.success }
                            &nbsp;
                            { strings.businesses.infoEditPanel.caseNumber }
                            <span className="font-bold">{ caseNumber }</span>
                            .
                        </div>
                    </div>
                    <div className="prose flex flex-col gap-2">
                        <text className="whitespace-pre-line">
                            { strings.businesses.infoEditPanel.thankYou }
                        </text>
                        <text className="cursor-pointer hover:underline italic opacity-80" onClick={ handleClose }>
                            { strings.businesses.infoEditPanel.closePanel }
                        </text>
                    </div>
                </div>
            )
        }

        if (submitStatus === SubmitStatus.TimeOut) {
            return (
                <>
                    <text className="text-red-500 font-bold">{ strings.businesses.infoEditPanel.timedOut }</text>
                    <SubmitButton>
                        { strings.businesses.infoEditPanel.tryAgain }
                    </SubmitButton>
                </>
            )
        }

        if (submitStatus === SubmitStatus.Error) {
            return (
                <>
                    <text className="text-red-500 font-bold">{ strings.businesses.infoEditPanel.error }</text>
                    <SubmitButton>
                        { strings.businesses.infoEditPanel.tryAgain }
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
            title={ strings.businesses.infoEditPanel.title }
        >
            <div className="flex flex-row gap-4 items-center">
                <div className="relative flex h-16 w-16 rounded-lg">
                    <Image
                        className="max-w-xs object-cover rounded-lg"
                        src={ imageSrc }
                        layout="fill"
                        alt="Business Logo"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <text className="text-base">{ currentBusiness.name }</text>
                    <text className="text-sm">{ currentBusiness.location.address }</text>
                </div>
            </div>
            <hr />
            <Formik
                initialValues={{ content: "", contact: "" }}
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
                                                <text>{ strings.businesses.infoEditPanel.contentFieldLabel }</text>
                                                <Field
                                                    type="text"
                                                    as="textarea"
                                                    name="content"
                                                    className="bg-transparent ring-1 ring-slate-600 focus:outline-ukraine-blue rounded-md p-4 h-32"
                                                    placeholder={ strings.businesses.infoEditPanel.contentPlaceholder }
                                                />
                                                <ErrorMessage name="content" component="div" className="italic opacity-80 text-sm text-red-700" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <text>{ strings.businesses.infoEditPanel.contactFieldLabel }</text>
                                                <Field
                                                    type="text"
                                                    as="textarea"
                                                    name="contact"
                                                    className="bg-transparent ring-1 ring-slate-600 focus:outline-ukraine-blue rounded-md p-4 h-32"
                                                    placeholder={ strings.businesses.infoEditPanel.contactPlaceholder }
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
