/**
 * A business card that displays basic (preview) information about a business.
 * @param fields all fields of a Business record according to the Airtable schema
 */
export default function BusinessCard({ fields }: any) {

    return (
        <div className="bg-white shadow-2xl w-64 h-64 p-2 m-2 rounded-2xl justify-center text-center text-black">
            <h1>{ fields.Name }</h1>
            <h2>{ fields['Description'] }</h2>
        </div>
    )
}