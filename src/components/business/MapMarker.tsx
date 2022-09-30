import { MapboxEvent, Marker } from 'react-map-gl';
import { Place as IconPlace } from "@mui/icons-material";
import { BusinessModel } from '@api/business/model';

export default function BusinessMapMarker({
    onClickEventHandler,
    key,
    data,
    active
}: {
    onClickEventHandler: (e: MapboxEvent<MouseEvent>) => void,
    key: number,
    data: BusinessModel,
    active: boolean
}) {

    return (
        <Marker
            key={ key }
            longitude={ data.location?.longitude }
            latitude={ data.location?.latitude }
            anchor="bottom"
            onClick={ onClickEventHandler }
        >
            <div className={ `flex flex-col items-center cursor-pointer ${ active ? "text-red-600" : "text-blue-900" }` }>
                <span className={ `font-bold text-lg`}>{ data.name }</span>
                <IconPlace className={ active ? "text-5xl" : "text-4xl" } />
            </div>
        </Marker>
    );
}
