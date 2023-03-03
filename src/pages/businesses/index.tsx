import { GetStaticProps, InferGetStaticPropsType } from "next"
import React, { createContext, ReactElement, useEffect, useState } from "react"
import 'mapbox-gl/dist/mapbox-gl.css'

import { NextPageWithLayout } from "../_app"
import { AppLayout } from "@layouts/app"
import { BusinessModel } from "@api/business/types"

import { log } from 'next-axiom'
import { BusinessViewContextData, PanelState } from "@appTypes/businesses"
import { BusinessView } from "@components/business/BusinessView"
import { InfoPanel } from "@components/business/InfoPanel"

import { atomAllBusinesses, atomCurrentBusiness, atomIsBusinessSelected, atomSelectedBusinessID } from "src/atoms/businesses"
import { useAtom } from "jotai"
import strings from "@utils/strings"

import { ArrowLeft as IconArrowLeft, ArrowRight as IconArrowRight } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import { twMerge } from "tailwind-merge"
import { jsonToBusiness } from "@api/business/model"
import { QueryParams } from "airtable/lib/query_params"
import { FieldSet } from "airtable/lib/field_set"
import Table from "airtable/lib/table"
import { processError } from "@api/_error"
import _base from "@api/_airtable"
import { AppMenu } from "@components/common/AppMenu"

const logger = log.with({ from: 'page.businesses.index' })

type Props = {
    businesses: BusinessModel[]
}

/**
 * Stores the global view-related context that is passed down to all the elements of the view.
 */
export const BusinessViewContext = createContext<BusinessViewContextData>({
    logger
});

const Main: NextPageWithLayout<Props> = ({ businesses }: InferGetStaticPropsType<typeof getStaticProps>) => {

    logger.with({ component: 'Main' }).debug("Loading Main...")

    const [ , setAllBusinesses ] = useAtom(atomAllBusinesses)
    const [ currentBusiness ] = useAtom(atomCurrentBusiness)
    const [ isBusinessSelected ] = useAtom(atomIsBusinessSelected)

    const [ infoPanelState, setInfoPanelState ] = useState<PanelState>(PanelState.Closed)

    // set all businesses when the props are changed
    useEffect(() => {
        setAllBusinesses(businesses)
    }, [ businesses, setAllBusinesses ])

    useEffect(() => {
        if (isBusinessSelected) {
            setInfoPanelState(PanelState.Open)
        } else {
            setInfoPanelState(PanelState.Closed)
        }
    }, [ currentBusiness, isBusinessSelected, setInfoPanelState ])

    // context vars to pass down to the child components
    const context = {
        logger
    }

    // TODO: this really should probably be a part of the infopanel, but it hasn't been working well so far
    // due to the weird MUI stuff with overflows
    const ToggleStateButton = ({ className }: { className?: string }) => (
        <Tooltip
            title={
                infoPanelState === PanelState.Closed ?
                strings.businesses.infoPage.tooltipOpenPanel
                : strings.businesses.infoPage.tooltipClosePanel
            }
            placement="right"
            arrow={ true }
        >
            <IconButton
                className={
                    twMerge(
                        "md:flex bg-white font-bold -translate-y-1/2 p-1 drop-shadow-lg py-4 rounded-none rounded-r-lg hover:bg-white hover:brightness-95",
                        className
                    )
                }
                onClick={
                    infoPanelState === PanelState.Closed ?
                    () => setInfoPanelState(PanelState.Open)
                    : () => setInfoPanelState(PanelState.Closed)
                }
            >
                {
                    infoPanelState === PanelState.Closed ?
                    (<IconArrowRight />)
                    : (<IconArrowLeft />)
                }
            </IconButton>
        </Tooltip>
    )

    const content = (
        <div className="flex relative h-full w-full">
            <InfoPanel panelState={ infoPanelState } setPanelState={ setInfoPanelState } className="transition-all duration-200 md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4" />
            <div className={
                twMerge(
                    "absolute top-1/2 hidden md:flex transition-all duration-200",
                    isBusinessSelected ? "" : "md:hidden",
                    infoPanelState === PanelState.Closed ? "left-0" : "md:left-1/2 lg:left-1/3 xl:left-1/3 2xl:left-1/4"
                )
            }>
                <ToggleStateButton className="z-10 my-auto" />
            </div>
            <div
                className={
                    twMerge(
                        "h-full relative flex flex-row w-full transition-all duration-200 justify-end items-center",
                    )
                }
            >
                <BusinessView className="flex relative h-full w-full" infoPanelOpen={ infoPanelState === PanelState.Open }  />
            </div>
        </div>
    )

    return (
        <>
            <BusinessViewContext.Provider value={ context }>
                { content }
            </BusinessViewContext.Provider>
        </>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    logger.debug("Attempting to load published records")

    // this is intentionally here rather than in a separate function
    // as otherwise it reduces efficiency and breaks revalidate

    let options : QueryParams<FieldSet> = {}

    let formula = "Publish = 1"
    options["filterByFormula"] = formula

    const table : Table<FieldSet> = _base('Business')

    let businesses : BusinessModel[] = await
        table.select(options)
           .all()
           .then(records => {
                logger.debug(`Success getting records by formula ${ formula }`)
                if (records) {
                    logger.debug(`Success: got ${ records.length } published records`)
                    return records.map((r: any) => jsonToBusiness(r._rawJson))
                }

                logger.debug("No records found, returning empty")
                return []
            })
           .catch(err => processError(err, "", logger.with({ "function": "_getRecordsByFormula" })))
        ?? []

    logger.debug(`Loaded ${ businesses.length } businesses`)

    return {
        props: {
            businesses
        },
        revalidate: 120
    }
}


Main.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            { page }
        </AppLayout>
    )
}

export default Main
