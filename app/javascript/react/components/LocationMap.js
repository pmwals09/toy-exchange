import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const LocationMap = withScriptjs(withGoogleMap((props) =>

    <GoogleMap
      defaultZoom={8}
      center={{lat: 42.3611, lng: -71.0570}}
    >
      { props.isMarkerShown && <Marker position={props.markerLocation} /> }
    </GoogleMap>
  ))

export default LocationMap
// <Marker position={props.markerLocation} />
