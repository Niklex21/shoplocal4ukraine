import Airtable from "airtable"
import { log } from 'next-axiom'

// Airtable database REST API set-up

Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY
})

log.with({ from: 'api.setup' }).debug("Connecting to Airtable...")

const base : Airtable.Base = Airtable.base(process.env.AIRTABLE_BASE_ID || "appo268wXvedC1FSM")

export default base