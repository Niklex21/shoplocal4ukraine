import { PanelState } from "@appTypes/businesses";
import ReportPanel from "@components/business/ReportPanel";
import strings from "@utils/strings"
import Link from "next/link"
import { useState } from "react";

interface Props {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: Props) {

    const [ reportPanelState, setReportPanelState ] = useState<PanelState>(PanelState.Closed)

    return (
        <>
            <div className="h-full w-full flex items-center justify-center flex-col gap-2">
                <text className="text-2xl">{ strings.all.genericError }</text>
                <text className="underline text-slate-700 italic hover:text-ukraine-blue" onClick={ () => setReportPanelState(PanelState.Open) }>
                    { strings.all.reportError }
                </text>
                <Link href="/">
                    { strings.all.pages.home }
                </Link>
            </div>
            <ReportPanel panelState={ reportPanelState } closePanel={ () => setReportPanelState(PanelState.Closed) } />
        </>
    )
}
