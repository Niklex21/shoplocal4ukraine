import { MapboxEvent, Marker } from 'react-map-gl';

export default function BusinessMapMarker({
    onClickEventHandler,
    key,
    fields,
}: {
    onClickEventHandler: (e: MapboxEvent<MouseEvent>) => void;
    key: number;
    fields: any;
}) {

    console.log(fields['Longitude'])

    return (
        <Marker
            key={ key }
            longitude={ parseFloat(fields['Longitude']) }
            latitude={ parseFloat(fields['Latitude']) }
            anchor="bottom"
            onClick={ onClickEventHandler }
        />
    );
}
