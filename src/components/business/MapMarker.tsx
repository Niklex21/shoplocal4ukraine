import { MapboxEvent, Marker } from 'react-map-gl';
import { Place as IconPlace } from "@mui/icons-material";

export default function BusinessMapMarker({
    onClickEventHandler,
    key,
    fields,
    active
}: {
    onClickEventHandler: (e: MapboxEvent<MouseEvent>) => void,
    key: number,
    fields: any,
    active: boolean
}) {

    return (
        <Marker
            key={ key }
            longitude={ parseFloat(fields['Longitude']) }
            latitude={ parseFloat(fields['Latitude']) }
            anchor="bottom"
            onClick={ onClickEventHandler }
        >
            <div className={ `flex flex-col items-center cursor-pointer ${ active ? "text-red-600" : "text-blue-900" }` }>
                <span className={ `font-bold text-lg`}>{ fields['Name'] }</span>
                <IconPlace className={ active ? "text-5xl" : "text-4xl" } />
            </div>
        </Marker>
    );
}
