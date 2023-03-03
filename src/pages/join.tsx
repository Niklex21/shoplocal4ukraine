import { Page } from '@appTypes/landing';
import { LandingLayout } from '@layouts/landing';
import strings from '@utils/strings';
import Script from 'next/script';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Join: NextPageWithLayout = () => {
    return (
        <>
            <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></Script>
            <iframe
                className="airtable-embed airtable-dynamic-height bg-none rounded-none border-none"
                src="https://airtable.com/embed/shrWIgk68QyqEcqCS?backgroundColor=purple"
                width="100%"
                height="3750"
            ></iframe>
        </>
    );
};

Join.getLayout = function getLayout(page: ReactElement) {
    return <LandingLayout current={Page.Join}>{page}</LandingLayout>;
};

Join.title = strings.landing.join.title

export default Join;
