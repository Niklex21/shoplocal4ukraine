import strings from "@utils/strings"
import Link from "next/link"

interface Props {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: Props) {
    return (
        <>
            <div className="h-full w-full flex items-center justify-center flex-col gap-2">
                <text className="text-2xl">{ strings.all.genericError }</text>
                <text>{ strings.all.reportError }</text>
                <Link href="/">
                    { strings.all.pages.home }
                </Link>
            </div>
        </>
    )
}
