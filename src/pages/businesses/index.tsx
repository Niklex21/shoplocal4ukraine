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
                {
                    businesses.map(
                        ({ id, fields } : { id: string, fields: Object}) => {
                            <div key={ id }></div>
                        })
                }
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    let businesses = await getRecords()

    // If businesses is defined (truthy), get a raw JSON map for each record
    // this is acceptable because we do not define the schema (it comes from Airtable)
    // and we want our code to work even if they change it
    businesses = businesses ? businesses.map(b => b._rawJson) : []

    return {
        props: {
            businesses
        }
    }
}

export default Main