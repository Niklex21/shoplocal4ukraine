import Airtable from "airtable"

// Airtable database REST API set-up

Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY
})

const base : Airtable.Base = Airtable.base(process.env.AIRTABLE_BASE_ID || "appo268wXvedC1FSM")

export default base