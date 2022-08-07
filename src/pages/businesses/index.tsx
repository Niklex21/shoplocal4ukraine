import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { BusinessViews, BusinessInfoPanel } from "@component/business"
import { getRecords } from "../../../api/business";

const Main: NextPage = ({ businesses }: InferGetStaticPropsType<typeof getStaticProps>) => {

    // TODO:
    // useState hooks for the currently selected business and filters
    // useState different map/business view based on filters

    return (
        <div className="min-h-max min-w-max lg:grid lg:grid-cols-3 gap-4 place-content-around">
            <div className="lg:col-span-2">
                <BusinessViews />
            </div>
            <div className="lg:col-span-1">
                { businesses }
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const businesses = await getRecords()
    
    return {
        props: {
            businesses
        }
    }
}

export default Main