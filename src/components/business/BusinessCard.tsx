export default function BusinessCard({ Name, Description } : { Name: string, Description: string}) {
    return (
        <div>
            { Name }
            { Description }
        </div>
    )
}