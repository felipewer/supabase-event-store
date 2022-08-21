import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";

import WaitingForGeolocation from "../waiting-geolocation";
import { env } from "../../env/client.mjs"
import { useEffect } from "react";

type Props = {
  geolocation: {
    latitude: number;
    longitude: number;
  }
}

const MapContent = (props: Props) => {
  const { latitude, longitude } = props.geolocation
  const map = useMap()
  
  useEffect(() => {
    if (latitude && longitude && map) {
      map.panTo([latitude,longitude])
    }
  })

  return <>
    <TileLayer
      attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url={`https://api.mapbox.com/styles/v1/${env.NEXT_PUBLIC_MAPBOX_STYLE}/tiles/{z}/{x}/{y}?access_token=${env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      tileSize={512}
      zoomOffset={-1}
    />
    <CircleMarker
      center={[latitude, longitude]}
      fillOpacity={1}
      radius={8}
      pathOptions={{ fillColor: "#FF0000", color: "#FFFFFF", weight: 1 }}
    >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </CircleMarker>
  </>
}

const Map = (props: Props) => {
  const { latitude, longitude } = props.geolocation
  return (latitude && longitude)
    ? <MapContainer
        className="h-full w-full"
        center={[latitude, longitude]}
        zoom={16}
        scrollWheelZoom={true}
      >
        {/* Here we need a child component to acces the map instance with useMap */}
        <MapContent geolocation={props.geolocation}/>
      </MapContainer>
    : <WaitingForGeolocation/>
}

export default Map
