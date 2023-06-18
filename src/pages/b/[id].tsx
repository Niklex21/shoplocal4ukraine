import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import strings from "@utils/strings";
import { NextPageWithLayout } from "../_app";


const BusinessURLShortener: NextPageWithLayout = () => {
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) router.push(`/businesses#business_id="${ router.query.id ?? "" }"`);
    }, [ router.isReady, router ])

    return (
        <>{ strings.redirect.loading }</>
    )
};

BusinessURLShortener.getLayout = function getLayout(page: ReactElement) {
    return page;
};

export default BusinessURLShortener;
