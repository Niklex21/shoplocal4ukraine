import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { BusinessViews, BusinessInfoPanel } from "@component/business"
import { getPublishedRecords } from "../../../api/business";
import BusinessCard from "@component/business/BusinessCard";
import Link from "next/link";

const Main: NextPage = ({ businesses }: InferGetStaticPropsType<typeof getStaticProps>) => {

    // TODO:
    // useState hooks for the currently selected business and filters
    // useState different map/business view based on filters

    return (
        <div className="lg:grid lg:grid-cols-3 gap-4 place-content-around">
            <div className="lg:col-span-2">
                <div className="grid grid-cols-4 gap-2 grid-flow-col">
                    {
                        businesses.map(
                        ({ id, fields } : { id: string, fields: Object }) => (
                            <Link key={ id } href={ `/business/${id}` }>
                                <BusinessCard fields={ fields }/>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className="lg:col-span-1 lg:grid lg:grid-cols-5 gap-2 place-content-start">
                Cool businesses preview
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    let businesses = await getPublishedRecords()

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