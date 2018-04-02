import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const CampMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.lat, lng: props.lon }}
    defaultOptions={{disableDefaultUI: true}}
  >
    {<Marker position={{ lat: props.lat, lng: props.lon }} />}
  </GoogleMap>
))



export default CampMap
