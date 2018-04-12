import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const CampMap = withScriptjs(withGoogleMap((props) => {
    let lat = props.lat;
    let lon = props.lon;
    let marker;

    if (!props.lat || !props.lon) {
      return null
    } else {
      marker = <Marker position={{ lat: lat, lng: lon }} />
    }

    return (<GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: lat, lng: lon }}
      defaultOptions={{disableDefaultUI: true}}
    >
      { marker }
    </GoogleMap>)
  }
))

export default CampMap
