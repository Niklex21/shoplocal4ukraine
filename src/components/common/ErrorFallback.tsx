import { PanelState } from "@appTypes/businesses";
import FeedbackPanel from "@components/business/FeedbackPanel";
import strings from "@utils/strings"
import Link from "next/link"
import { useState } from "react";

interface Props {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: Props) {

    const [ feedbackPanelState, setFeedbackPanelState ] = useState<PanelState>(PanelState.Closed)

    return (
        <>
            <div className="h-full w-full flex items-center justify-center flex-col gap-8">
                <text className="text-2xl">{ strings.all.genericError }</text>
                <text className="underline text-xl text-slate-700 italic hover:text-ukraine-blue cursor-pointer" onClick={ () => setFeedbackPanelState(PanelState.Open) }>
                    { strings.all.reportError }
                </text>
                <Link href="/" className="text-lg underline hover:text-ukraine-blue">
                    { strings.all.error.goHome }
                </Link>
            </div>
            <FeedbackPanel panelState={ feedbackPanelState } closePanel={ () => setFeedbackPanelState(PanelState.Closed) } />
        </>
    )
}
